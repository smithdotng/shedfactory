import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getPosts, getPost, coverFor, formatDate } from '@/lib/blog';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/content';
import CtaBand from '@/components/CtaBand';

export const revalidate = 3600;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return pageMeta({
    title: p.title,
    description: p.description,
    path: `/blog/${p.slug}`,
    image: coverFor(p),
    type: 'article',
    publishedTime: p.date,
    authors: [p.author],
    tags: p.tags,
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const more = getPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: site.legalName, logo: `${site.url}/assets/images/resources/shedfactory_logo.png` },
    image: `${site.url}${coverFor(post)}`,
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="section" style={{ paddingTop: 80 }}>
        <div className="wrap post">
          <Link href="/blog" className="crumbs" style={{ alignItems: 'center' }}><ArrowLeft size={16} /> All articles</Link>
          {post.tags.length > 0 && <span className="eyebrow">{post.tags.join(' · ')}</span>}
          <h1 className="post__title">{post.title}</h1>
          <p className="lead">{post.description}</p>
          <p className="post-meta" style={{ marginTop: 18 }}>
            {post.author} · {formatDate(post.date)} · {post.readingMinutes} min read
          </p>
          <div className="post__cover"><img src={coverFor(post)} alt="" width={1200} height={630} /></div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </article>
      {more.length > 0 && (
        <section className="section section--raised">
          <div className="wrap">
            <div className="section-head"><span className="eyebrow">Keep reading</span></div>
            <div className="posts posts--two">
              {more.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="post-card">
                  <div className="post-card__img"><img src={coverFor(p)} alt="" width={1200} height={630} loading="lazy" /></div>
                  <div className="post-card__body">
                    <span className="post-meta">{formatDate(p.date)}</span>
                    <h3>{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
