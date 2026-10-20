import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { products, studio } from '@/lib/content';
import { Stats, ProductCards, ServiceGrid, WorkGrid, Testimonials, Faq, ProcessSteps } from '@/components/Sections';
import CtaBand from '@/components/CtaBand';
import { getPosts, coverFor, formatDate } from '@/lib/blog';

export default function Home() {
  const latest = getPosts().slice(0, 3);
  return (
    <>
      <section className="hero">
        <div className="hero__glow" />
        <div className="wrap hero__grid">
          <div>
            <span className="eyebrow">Digital creative agency · Product studio</span>
            <h1 className="h-display">
              Bringing dreams to <span className="grad-text">digital life.</span>
            </h1>
            <p className="lead">
              For a decade we’ve turned ideas into brands, websites and platforms. We build our own products — and we’ll help you build yours.
            </p>
            <div className="btn-row">
              <Link href="/startups" className="btn btn--primary">
                Bring your idea to life <ArrowRight size={18} />
              </Link>
              <Link href="/products" className="btn btn--ghost">
                See our products
              </Link>
            </div>
          </div>
          <aside className="hero__aside">
            <p>Platforms built and run by Shedfactory</p>
            <div className="hero__products">
              {products.map((p) => (
                <Link href={`/products/${p.slug}`} className="hero__product" key={p.slug}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="dot" style={{ background: p.accent }} />
                    <strong>{p.domain}</strong>
                  </span>
                  <span>{p.category.split(' ')[0].replace(',', '')}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <div className="wrap">
        <Stats />
      </div>

      <section className="section">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">About Shedfactory</span>
              <h2 className="h-section">We bridge the gap between a dream and the product people use.</h2>
            </div>
            <div>
              <p className="lead">
                Every great business starts with a dream. Our clients bring the vision and the passion; we bring the creative and technical expertise to give it form — compelling brands, engaging websites, powerful web applications and marketing that delivers.
              </p>
              <Link href="/about" className="btn btn--ghost" style={{ marginTop: 10 }}>
                Our story <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Our products</span>
            <h2 className="h-section">We don’t just build for others. We build our own.</h2>
            <p className="lead">
              Five platforms, designed, engineered and operated in-house — for places to eat, beauty, property, logistics and media.
            </p>
          </div>
          <ProductCards />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Our expertise</span>
            <h2 className="h-section">How we bring dreams to life</h2>
          </div>
          <ServiceGrid />
        </div>
      </section>

      <section className="section section--raised">
        <div className="wrap split split--top">
          <div>
            <span className="eyebrow">For startups & companies</span>
            <h2 className="h-section">{studio.headline}</h2>
            <p className="lead">{studio.intro}</p>
            <Link href="/startups" className="btn btn--primary" style={{ marginTop: 10 }}>
              How we build with founders <ArrowRight size={18} />
            </Link>
          </div>
          <div className="studio-panel">
            <h3 style={{ fontSize: 22 }}>Who we work with</h3>
            <ul className="check-list" style={{ marginBottom: 0 }}>
              {studio.audiences.map((a) => (
                <li key={a}>
                  <Check size={18} /> <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Our process</span>
            <h2 className="h-section">From first conversation to launch day</h2>
          </div>
          <ProcessSteps />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', maxWidth: 'none', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <span className="eyebrow">Featured work</span>
              <h2 className="h-section" style={{ margin: 0 }}>Dreams we’ve brought to life</h2>
            </div>
            <Link href="/work" className="btn btn--ghost">All work <ArrowRight size={18} /></Link>
          </div>
          <WorkGrid limit={4} />
        </div>
      </section>

      <section className="section section--cream">
        <div className="wrap">
          <div className="section-head section-head--center">
            <span className="eyebrow">Testimonials</span>
            <h2 className="h-section">What our clients say</h2>
          </div>
          <Testimonials />
        </div>
      </section>

      {latest.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', maxWidth: 'none', gap: 20, flexWrap: 'wrap' }}>
              <div>
                <span className="eyebrow">From the blog</span>
                <h2 className="h-section" style={{ margin: 0 }}>Notes from the studio</h2>
              </div>
              <Link href="/blog" className="btn btn--ghost">All articles <ArrowRight size={18} /></Link>
            </div>
            <div className="posts" style={{ marginTop: 0 }}>
              {latest.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="post-card">
                  <div className="post-card__img"><img src={coverFor(p)} alt="" width={1200} height={630} loading="lazy" /></div>
                  <div className="post-card__body">
                    <span className="post-meta">{formatDate(p.date)} · {p.readingMinutes} min read</span>
                    <h3>{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap split split--top">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 className="h-section">Questions, answered</h2>
            <p className="lead">Can’t find what you need? WhatsApp us or send a message — we respond within 24 hours.</p>
          </div>
          <Faq />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
