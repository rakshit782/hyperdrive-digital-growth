/**
 * Sitemap entries parser and hierarchical tree builder for flow-chart view
 */

export interface SitemapNode {
  name: string;
  path: string;
  url: string;
  lastmod?: string;
  category: 'core' | 'services' | 'case-studies' | 'comparisons' | 'legal' | 'blog' | 'other';
  children?: SitemapNode[];
}

export function parseSitemapXml(xmlText: string): { url: string; lastmod?: string }[] {
  const list: { url: string; lastmod?: string }[] = [];
  const urlRegex = /<url>([\s\S]*?)<\/url>/g;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(xmlText)) !== null) {
    const block = match[1];
    const locMatch = /<loc>([^<]+)<\/loc>/.exec(block);
    const lastmodMatch = /<lastmod>([^<]+)<\/lastmod>/.exec(block);
    if (locMatch) {
      list.push({
        url: locMatch[1].trim(),
        lastmod: lastmodMatch ? lastmodMatch[1].trim() : undefined,
      });
    }
  }
  return list;
}

export function categorizeUrl(pathname: string): SitemapNode['category'] {
  if (pathname === '/' || pathname === '/about' || pathname === '/contact') return 'core';
  if (pathname.startsWith('/services')) return 'services';
  if (pathname.includes('case-studies')) return 'case-studies';
  if (pathname.includes('alternative')) return 'comparisons';
  if (pathname === '/privacy' || pathname === '/terms' || pathname === '/refund-policy' || pathname === '/eula' || pathname.includes('privacy')) return 'legal';
  if (pathname.startsWith('/blog')) return 'blog';
  return 'other';
}

export function buildSitemapHierarchy(items: { url: string; lastmod?: string }[]): SitemapNode {
  const root: SitemapNode = {
    name: 'AMZ AD SCOUT (Home)',
    path: '/',
    url: 'https://www.amzadscout.com/',
    category: 'core',
    children: [],
  };

  const categories: Record<string, { name: string; category: SitemapNode['category']; children: SitemapNode[] }> = {
    services: { name: 'Services & Solutions', category: 'services', children: [] },
    caseStudies: { name: 'Performance Case Studies', category: 'case-studies', children: [] },
    comparisons: { name: 'Tool Comparisons (Alternatives)', category: 'comparisons', children: [] },
    core: { name: 'Company & Contact', category: 'core', children: [] },
    blog: { name: 'Insights & Blog', category: 'blog', children: [] },
    legal: { name: 'Trust & Legal', category: 'legal', children: [] },
  };

  items.forEach((item) => {
    let pathname = '';
    try {
      const u = new URL(item.url);
      pathname = u.pathname;
    } catch {
      pathname = item.url.replace(/^https?:\/\/[^/]+/, '');
    }

    if (pathname === '' || pathname === '/') {
      root.lastmod = item.lastmod;
      return;
    }

    const cat = categorizeUrl(pathname);
    const label = pathname
      .replace(/^\//, '')
      .replace(/^(services|case-studies)\//, '')
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    const node: SitemapNode = {
      name: label || pathname,
      path: pathname,
      url: item.url,
      lastmod: item.lastmod,
      category: cat,
    };

    if (cat === 'services') {
      categories.services.children.push(node);
    } else if (cat === 'case-studies') {
      categories.caseStudies.children.push(node);
    } else if (cat === 'comparisons') {
      categories.comparisons.children.push(node);
    } else if (cat === 'legal') {
      categories.legal.children.push(node);
    } else if (cat === 'blog') {
      categories.blog.children.push(node);
    } else {
      categories.core.children.push(node);
    }
  });

  root.children = [
    {
      name: categories.services.name,
      path: '/services',
      url: 'https://www.amzadscout.com/services',
      category: 'services',
      children: categories.services.children,
    },
    {
      name: categories.caseStudies.name,
      path: '/case-studies',
      url: 'https://www.amzadscout.com/case-studies',
      category: 'case-studies',
      children: categories.caseStudies.children,
    },
    {
      name: categories.comparisons.name,
      path: '/amazon-tools-alternative',
      url: 'https://www.amzadscout.com/amazon-tools-alternative',
      category: 'comparisons',
      children: categories.comparisons.children,
    },
    {
      name: categories.core.name,
      path: '/about',
      url: 'https://www.amzadscout.com/about',
      category: 'core',
      children: categories.core.children,
    },
    {
      name: categories.blog.name,
      path: '/blog',
      url: 'https://www.amzadscout.com/blog',
      category: 'blog',
      children: categories.blog.children,
    },
    {
      name: categories.legal.name,
      path: '/privacy',
      url: 'https://www.amzadscout.com/privacy',
      category: 'legal',
      children: categories.legal.children,
    },
  ];

  return root;
}
