import type { MetadataRoute } from 'next';
import { site, products, services } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/about', '/products', '/services', '/startups', '/work', '/contact',
    ...products.map((p) => `/products/${p.slug}`), ...services.map((s) => `/services/${s.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
