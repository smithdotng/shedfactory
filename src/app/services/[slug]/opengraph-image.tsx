import { services } from '@/lib/content';
import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Shedfactory service';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return ogImage({ eyebrow: 'Service', title: s?.title ?? 'Our services', subtitle: s?.short });
}
