import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, ArrowRight } from 'lucide-react';
import { services } from '@/lib/content';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import { pageMeta } from '@/lib/seo';
import { ProcessSteps, Testimonials } from '@/components/Sections';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? pageMeta({ title: s.title, description: s.short, path: `/services/${s.slug}`, image: `/og/service-${s.slug}.jpg` }) : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();

  return (
    <>
      <PageHero
        crumbs={[{ href: '/services', label: 'Services' }, { label: s.title }]}
        eyebrow="Service"
        title={s.title}
        lead={s.short}
        bg="/assets/images/backgrounds/page-header-bg-service.jpg"
      />
      <section className="section">
        <div className="wrap split">
          <div>
            {s.intro.map((p, i) => (
              <p key={i} className={i === 0 ? 'lead' : 'muted'} style={i === 0 ? { color: 'var(--text)' } : undefined}>{p}</p>
            ))}
            <ul className="check-list">
              {s.offerings.map((o) => (
                <li key={o}><Check size={18} /> <span>{o}</span></li>
              ))}
            </ul>
            <Link href="/contact" className="btn btn--primary">Start your project <ArrowRight size={18} /></Link>
          </div>
          <div className="service-img">
            <img src={s.image} alt={s.title} />
          </div>
        </div>
      </section>
      <section className="section section--raised">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Why it matters</span>
            <h2 className="h-section">What you get</h2>
          </div>
          <div className="benefits">
            {s.benefits.map((b) => (
              <div className="benefit" key={b.title} style={{ background: 'var(--ink)' }}>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Our approach</span>
            <h2 className="h-section">How we deliver</h2>
          </div>
          <ProcessSteps />
        </div>
      </section>
      <section className="section section--cream">
        <div className="wrap"><Testimonials /></div>
      </section>
      <section className="section--tight">
        <div className="wrap" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <span className="muted" style={{ alignSelf: 'center', marginRight: 8 }}>Other services:</span>
          {services.filter((x) => x.slug !== s.slug).map((x) => (
            <Link key={x.slug} href={`/services/${x.slug}`} className="btn btn--ghost" style={{ padding: '10px 18px', fontSize: 15 }}>{x.title}</Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
