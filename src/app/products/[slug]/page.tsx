import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check, ArrowRight } from 'lucide-react';
import { products } from '@/lib/content';
import CtaBand from '@/components/CtaBand';
import { pageMeta } from '@/lib/seo';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta({ title: `${p.domain} — ${p.tagline}`, description: p.summary, path: `/products/${p.slug}`, image: `/products/${p.slug}/opengraph-image` });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  const others = products.filter((x) => x.slug !== p.slug);

  return (
    <>
      <section className="product-hero" style={{ ['--accent' as string]: p.accent }}>
        <div className="product-hero__glow" />
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products">Products</Link> / <span>{p.name}</span>
          </nav>
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="product-hero__domain">
            <span className="dot" style={{ background: p.accent }} /> {p.domain} <ArrowUpRight size={15} />
          </a>
          <h1 className="h-display" style={{ maxWidth: 950 }}>{p.tagline}</h1>
          <p className="lead" style={{ marginTop: 22, marginBottom: 36 }}>{p.summary}</p>
          <div className="btn-row">
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ background: p.accent, color: '#fff', boxShadow: 'none' }}>
              Visit {p.domain} <ArrowUpRight size={18} />
            </a>
            <Link href="/contact" className="btn btn--ghost">Partner with {p.name}</Link>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{p.category}</span>
            <h2 className="h-section">Built for both sides of the table</h2>
            {p.cities && <p className="lead">Available in {p.cities}.</p>}
          </div>
          <div className="audience-grid">
            {[p.forUsers, p.forBusiness].map((a) => (
              <div className="audience" key={a.title}>
                <h3>{a.title}</h3>
                <ul className="check-list" style={{ marginBottom: 0 }}>
                  {a.points.map((pt) => (
                    <li key={pt}><Check size={18} style={{ color: p.accent }} /> <span>{pt}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">More from Shedfactory</span>
            <h2 className="h-section">Our other products</h2>
          </div>
          <div className="work">
            {others.map((o) => (
              <Link key={o.slug} href={`/products/${o.slug}`} className="studio-panel" style={{ display: 'block' }}>
                <span className="dot" style={{ background: o.accent, display: 'inline-block', marginBottom: 18 }} />
                <h3 style={{ fontSize: 28 }}>{o.domain}</h3>
                <p className="muted">{o.tagline}</p>
                <span className="service-card__more">Explore <ArrowRight size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={`Your idea could be the next ${p.name}.`} text="We built this platform from scratch. Let’s talk about building yours." href="/startups" label="Build with us" />
    </>
  );
}
