import { blogPostPaths } from './content/blogPosts';
import { detailedServiceSlugs } from './pages/DetailedServicePage';

/**
 * Public URLs emitted as static HTML at build time.
 * Service paths are the explicit routes in App.tsx plus every slug
 * DetailedServicePage serves at /services/:serviceType.
 * /services/website-development is registered as its own page and is
 * listed once (that route wins over the param route).
 */
const staticServiceRoutes = [
  '/services/website-development',
  '/services/listing-optimization',
  '/services/product-cataloging',
];

const detailedServiceRoutes = detailedServiceSlugs.map((slug) => `/services/${slug}`);

export const publicRoutes: string[] = [
  '/',
  '/about',
  '/services',
  ...new Set([...staticServiceRoutes, ...detailedServiceRoutes]),
  '/case-studies',
  '/amazon-case-studies',
  '/meta-case-studies',
  '/walmart-case-studies',
  '/amazon-tools-alternative',
  '/helium-10-alternative',
  '/jungle-scout-alternative',
  '/contact',
  '/contact-us',
  '/free-audit',
  '/pricing',
  '/blog',
  ...blogPostPaths,
  '/privacy',
  '/terms',
  '/refund-policy',
  '/eula',
  '/amz-copilot-privacy',
  '/amazon-ads-partner',
  '/verify-certificate',
];

/** Booted from dist/spa.html. Not given per-route HTML. */
export const clientOnlyRoutes = [
  '/dashboard',
  '/dashboard/login',
  '/dashboard/signup',
  '/ad-landing',
  '/blog/:slug',
];
