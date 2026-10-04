import { Helmet } from 'react-helmet-async';

/**
 * Head tags for a public route. Rendered through react-helmet-async so the
 * same tags appear in prerendered HTML and after hydration.
 *
 * Props:
 * - title: document title. Always used as-is (no runtime/localStorage override).
 * - description: meta description, also og:description and twitter:description.
 * - keywords: accepted so existing pages keep compiling. Not rendered.
 * - image: optional og:image and twitter:image.
 * - url: optional explicit URL for og:url. When omitted, og:url uses canonical.
 * - canonical: page URL (absolute or path). Normalized to
 *   https://www.amzadscout.com/<path> with no trailing slash except `/`.
 *   When omitted, the current location is used.
 * - schema: one JSON-LD object, or an array of objects. Each becomes its own
 *   `<script type="application/ld+json">`.
 * - robots: when set, renders `<meta name="robots" content={robots}>`.
 *   Omitted entirely when the prop is not passed.
 */
interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  canonical?: string;
  schema?: object | object[] | null;
  robots?: string;
}

const SITE_ORIGIN = 'https://www.amzadscout.com';

function toAbsoluteCanonical(canonical?: string): string | undefined {
  if (!canonical) return undefined;
  const trimmed = canonical.trim();
  if (!trimmed) return undefined;

  let path = trimmed;
  try {
    if (/^https?:\/\//i.test(trimmed)) {
      path = new URL(trimmed).pathname || '/';
    }
  } catch {
    return undefined;
  }

  path = path.split('?')[0].split('#')[0];
  if (!path.startsWith('/')) path = `/${path}`;
  if (path.length > 1) path = path.replace(/\/+$/, '');
  if (path === '/' || path === '') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}

function schemaBlocks(schema: SEOHeadProps['schema']): object[] {
  if (!schema) return [];
  const blocks = Array.isArray(schema) ? schema : [schema];
  return blocks.filter((block): block is object => !!block && typeof block === 'object');
}

const SEOHead = ({
  title,
  description,
  image,
  url,
  canonical,
  schema,
  robots,
}: SEOHeadProps) => {
  const canonicalHref = toAbsoluteCanonical(
    canonical || (typeof window !== 'undefined' ? window.location.href : undefined)
  );
  const ogUrl = url ? toAbsoluteCanonical(url) ?? url : canonicalHref;
  const blocks = schemaBlocks(schema);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {robots ? <meta name="robots" content={robots} /> : null}
      {canonicalHref ? <link rel="canonical" href={canonicalHref} /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {ogUrl ? <meta property="og:url" content={ogUrl} /> : null}
      {image ? <meta property="og:image" content={image} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image ? <meta name="twitter:image" content={image} /> : null}
      {blocks.map((block, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(block).replace(/</g, '\\u003c')}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
