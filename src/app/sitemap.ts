import type { MetadataRoute } from 'next';
import { site, products, services } from '@/lib/content';
import { getPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/about', '/products', '/services', '/startups', '/work', '/contact', '/blog',
    ...products.map((p) => `/products/${p.slug}`), ...services.map((s) => `/services/${s.slug}`), ...getPosts().map((p) => `/blog/${p.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
