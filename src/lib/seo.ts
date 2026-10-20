import type { Metadata } from 'next';
import { site } from './content';

/**
 * Per-page metadata with matching Open Graph + Twitter tags and a canonical URL.
 * Share images come from the nearest opengraph-image.tsx unless `image` is given.
 */
export function pageMeta({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  authors,
  tags,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
}): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  // Default site card; product, service and blog pages pass their own generated image.
  const images = [{ url: image || '/opengraph-image', width: 1200, height: 630, alt: title }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: 'en_GB',
      title: fullTitle,
      description,
      images,
      ...(type === 'article' && { publishedTime, authors, tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}
