import { ogImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Shedfactory — Bringing dreams to digital life';

export default function Image() {
  return ogImage({
    eyebrow: 'Digital creative agency · Product studio',
    title: 'Bringing dreams to digital life.',
    subtitle: 'Brands, websites and platforms — and the makers of Shed, Diner, Glee, Found, Haulage and 74 Tribe.',
  });
}
