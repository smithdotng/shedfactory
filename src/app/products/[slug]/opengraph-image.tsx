import { products } from '@/lib/content';
import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Shedfactory product';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return ogImage({ eyebrow: p ? p.domain : 'Products', title: p?.tagline ?? 'Our products', subtitle: p?.category, accent: p?.accent });
}
