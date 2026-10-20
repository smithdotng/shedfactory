import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getPosts, coverFor, formatDate } from '@/lib/blog';
import { pageMeta } from '@/lib/seo';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';

export const revalidate = 3600; // picks up scheduled posts without a redeploy

export const metadata = pageMeta({
  title: 'Blog',
  description: 'Ideas, guides and lessons from Shedfactory on building brands, websites and digital products.',
  path: '/blog',
});

export default function Blog() {
  const posts = getPosts();
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Blog' }]}
        eyebrow="Insights"
        title={<>Notes from the <span className="grad-text">studio.</span></>}
        lead="Guides and lessons from building our own products and helping others build theirs."
      />
      <section className="section">
        <div className="wrap">
          {!posts.length && <p className="muted">No posts yet — check back soon.</p>}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="post-featured">
              <div className="post-card__img"><img src={coverFor(featured)} alt="" width={1200} height={630} /></div>
              <div className="post-featured__body">
                <span className="post-meta">{formatDate(featured.date)} · {featured.readingMinutes} min read</span>
                <h2>{featured.title}</h2>
                <p className="muted">{featured.description}</p>
                <span className="service-card__more">Read article <ArrowRight size={16} /></span>
              </div>
            </Link>
          )}
          {rest.length > 0 && (
            <div className={`posts${rest.length === 2 ? ' posts--two' : ''}`}>
              {rest.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="post-card">
                  <div className="post-card__img"><img src={coverFor(p)} alt="" width={1200} height={630} loading="lazy" /></div>
                  <div className="post-card__body">
                    <span className="post-meta">{formatDate(p.date)} · {p.readingMinutes} min read</span>
                    <h3>{p.title}</h3>
                    <p className="muted">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
