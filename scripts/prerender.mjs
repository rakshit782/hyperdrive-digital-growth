import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Window } from 'happy-dom';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const ORIGIN = 'https://www.amzadscout.com';

function installDom(initialUrl) {
  const win = new Window({
    url: initialUrl,
    settings: {
      disableJavaScriptEvaluation: true,
      disableJavaScriptFileLoading: true,
      disableCSSFileLoading: true,
      disableIframePageLoading: true,
    },
  });

  const assignGlobal = (name, value) => {
    try {
      Object.defineProperty(globalThis, name, {
        value,
        writable: true,
        configurable: true,
      });
    } catch {
      try {
        globalThis[name] = value;
      } catch (error) {
        console.warn(`Could not assign global ${name}: ${error.message}`);
      }
    }
  };

  assignGlobal('window', win);
  assignGlobal('document', win.document);
  assignGlobal('navigator', win.navigator);
  assignGlobal('localStorage', win.localStorage);
  assignGlobal('sessionStorage', win.sessionStorage);
  assignGlobal('self', win);

  const copy = [
    'HTMLElement',
    'Element',
    'Node',
    'DocumentFragment',
    'SVGElement',
    'HTMLAnchorElement',
    'HTMLImageElement',
    'MutationObserver',
    'IntersectionObserver',
    'ResizeObserver',
    'Event',
    'CustomEvent',
    'KeyboardEvent',
    'MouseEvent',
    'getComputedStyle',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    'matchMedia',
    'DOMParser',
    'NodeFilter',
    'Image',
    'FormData',
  ];

  for (const name of copy) {
    if (typeof win[name] !== 'undefined') {
      assignGlobal(name, win[name]);
    }
  }

  if (typeof win.getComputedStyle === 'function') globalThis.getComputedStyle = win.getComputedStyle.bind(win);
  if (typeof win.matchMedia === 'function') globalThis.matchMedia = win.matchMedia.bind(win);
  if (typeof win.requestAnimationFrame === 'function') {
    globalThis.requestAnimationFrame = win.requestAnimationFrame.bind(win);
    globalThis.cancelAnimationFrame = win.cancelAnimationFrame.bind(win);
  } else {
    globalThis.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
    globalThis.cancelAnimationFrame = (id) => clearTimeout(id);
  }

  return win;
}

function setUrl(win, pathname) {
  const url = pathname === '/' ? `${ORIGIN}/` : `${ORIGIN}${pathname}`;
  if (typeof win.happyDOM?.setURL === 'function') {
    win.happyDOM.setURL(url);
  } else {
    win.location.href = url;
  }
}

function inject(template, head, html) {
  const rootMarker = '<div id="root"></div>';
  if (!template.includes(rootMarker)) {
    throw new Error('Client shell is missing <div id="root"></div>');
  }
  if (!template.includes('</head>')) {
    throw new Error('Client shell is missing </head>');
  }
  const withHead = template.replace('</head>', () => `${head}\n  </head>`);
  return withHead.replace(rootMarker, () => `<div id="root">${html}</div>`);
}

function assert(condition, message) {
  if (!condition) {
    console.error(`prerender check failed: ${message}`);
    process.exitCode = 1;
  }
}

const shellPath = path.join(DIST, 'index.html');
if (!fs.existsSync(shellPath)) {
  console.error('dist/index.html is missing. Run the client vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(shellPath, 'utf8');

// Import the server bundle before a DOM exists. react-helmet-async decides
// server vs client mode when the module loads; a pre-existing window makes it
// skip the Helmet context we read the title and meta tags from.
const serverEntry = pathToFileURL(path.join(ROOT, '.ssr', 'entry-server.js')).href;
const { render, publicRoutes } = await import(serverEntry);
const win = installDom(`${ORIGIN}/`);

if (!Array.isArray(publicRoutes) || publicRoutes.length === 0) {
  console.error('No public routes exported from the server bundle.');
  process.exit(1);
}

const written = [];

for (const route of publicRoutes) {
  setUrl(win, route);
  let rendered;
  try {
    rendered = render(route);
  } catch (error) {
    console.error(`Failed to render ${route}`);
    console.error(error);
    process.exit(1);
  }

  const { html, head } = rendered;
  if (!html || !html.trim()) {
    console.error(`Empty HTML for ${route}`);
    process.exit(1);
  }
  if (!/<h1[\s>]/.test(html)) {
    console.error(`No H1 in rendered body for ${route}`);
    process.exit(1);
  }
  if (!/<title[\s>]/.test(head)) {
    console.error(`No <title> for ${route}`);
    process.exit(1);
  }
  if (route.startsWith('/services/') && html.includes('Service Not Found')) {
    console.error(`${route} rendered the missing-service fallback`);
    process.exit(1);
  }
  const expectedCanonical =
    route === '/' ? `${ORIGIN}/` : `${ORIGIN}${route}`;
  if (!head.includes(`href="${expectedCanonical}"`)) {
    console.error(`${route} canonical is not ${expectedCanonical}`);
    process.exit(1);
  }
  if (head.includes('name="keywords"') || html.includes('name="keywords"')) {
    console.error(`${route} emitted a keywords meta tag`);
    process.exit(1);
  }

  const file =
    route === '/'
      ? path.join(DIST, 'index.html')
      : path.join(DIST, ...route.split('/').filter(Boolean), 'index.html');

  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, inject(template, head, html));
  written.push(path.relative(DIST, file));
  console.log(`prerendered ${route} -> ${path.relative(DIST, file)}`);
}

const spa = template.includes('name="robots"')
  ? template
  : template.replace('</head>', () => '    <meta name="robots" content="noindex">\n  </head>');
fs.writeFileSync(path.join(DIST, 'spa.html'), spa);
written.push('spa.html');
console.log('wrote dist/spa.html');

const pricing = fs.readFileSync(path.join(DIST, 'pricing', 'index.html'), 'utf8');
const home = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const listing = fs.readFileSync(path.join(DIST, 'services', 'listing-optimization', 'index.html'), 'utf8');
const verify = fs.readFileSync(path.join(DIST, 'verify-certificate', 'index.html'), 'utf8');
const spaHtml = fs.readFileSync(path.join(DIST, 'spa.html'), 'utf8');

assert(pricing.includes('$499'), '/pricing HTML does not contain $499');
assert(pricing.includes('https://www.amzadscout.com/pricing'), '/pricing is missing the www canonical');
assert(/<title[^>]*>[^<]*Pricing[^<]*<\/title>/i.test(pricing), '/pricing title is not pricing-specific');
assert(!pricing.includes('name="keywords"') && !home.includes('name="keywords"'), 'meta keywords was emitted');
assert(home.includes('https://www.amzadscout.com/'), '/ is missing the www canonical');
assert(listing.includes('https://www.amzadscout.com/services/listing-optimization'), 'listing page canonical');
assert(listing.includes('<h1'), 'listing page H1');
assert(verify.includes('https://www.amzadscout.com/verify-certificate'), 'verify-certificate canonical');
assert(verify.includes('noindex, follow'), 'verify-certificate robots');
assert(spaHtml.includes('<meta name="robots" content="noindex">'), 'spa.html robots');
assert(spaHtml.includes('<div id="root"></div>'), 'spa.html should boot from an empty root');
assert(!fs.existsSync(path.join(DIST, 'dashboard', 'index.html')), 'dashboard was prerendered');
assert(!fs.existsSync(path.join(DIST, 'ad-landing', 'index.html')), 'ad-landing was prerendered');

console.log('\nGenerated files:');
for (const file of written) console.log(`  dist/${file}`);

if (process.exitCode) process.exit(process.exitCode);
