import { getPosts } from '@/lib/blog';
import { site } from '@/lib/content';

export const revalidate = 3600;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
  const items = getPosts()
    .map(
      (p) => `<item><title>${esc(p.title)}</title><link>${site.url}/blog/${p.slug}</link><guid>${site.url}/blog/${p.slug}</guid><pubDate>${new Date(p.date + 'T09:00:00Z').toUTCString()}</pubDate><description>${esc(p.description)}</description></item>`,
    )
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${site.name} Blog</title><link>${site.url}/blog</link><description>${esc(site.description)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
