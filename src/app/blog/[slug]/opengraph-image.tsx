import { getPost, getPosts } from '@/lib/blog';
import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Shedfactory blog';

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  return ogImage({ eyebrow: p?.tags[0] ? `Blog · ${p.tags[0]}` : 'Blog', title: p?.title ?? 'Shedfactory Blog' });
}
