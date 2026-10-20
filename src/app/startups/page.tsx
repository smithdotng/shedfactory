import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { studio, products } from '@/lib/content';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { Faq } from '@/components/Sections';

export const metadata = pageMeta({
  title: 'For Startups & Companies — Bring Your Idea to Life',
  description: 'Shedfactory helps startup founders and companies turn ideas into launched products: strategy, brand, MVP design and development, hosting and growth.',
  path: '/startups',
  image: '/og/startups.jpg',
});

export default function Startups() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'For Startups' }]}
        eyebrow="Venture building for founders & companies"
        title={<>Got an idea? <span className="grad-text">Let’s bring it to life.</span></>}
        lead={studio.intro}
        bg="/assets/images/backgrounds/main-slider-1-3.jpg"
      />

      <section className="section">
        <div className="wrap split split--top">
          <div>
            <span className="eyebrow">Who it’s for</span>
            <h2 className="h-section">You bring the vision. We bring the team.</h2>
            <p className="lead">
              Most founders don’t have a designer, an engineer and a marketer on day one. You don’t need to — we’ve built that team, and we’ve used it to launch our own products.
            </p>
            <ul className="check-list">
              {studio.audiences.map((a) => (
                <li key={a}><Check size={18} /> <span>{a}</span></li>
              ))}
            </ul>
          </div>
          <div className="studio-panel">
            <h3 style={{ fontSize: 22 }}>Proof we’ve done it ourselves</h3>
            <p className="muted" style={{ fontSize: 15.5 }}>Every one of these started as an idea in our studio.</p>
            <div className="hero__products">
              {products.map((p) => (
                <Link href={`/products/${p.slug}`} className="hero__product" key={p.slug}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="dot" style={{ background: p.accent }} />
                    <strong>{p.domain}</strong>
                  </span>
                  <span>{p.tagline}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">From idea to launch</span>
            <h2 className="h-section">Four stages. One partner.</h2>
            <p className="lead">Join at whatever stage you’re at — we’ll meet you there.</p>
          </div>
          <div className="steps">
            {studio.stages.map((s, i) => (
              <div className="step" key={s.title}>
                <span className="step__num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Ways to work together</span>
            <h2 className="h-section">Pick the model that fits</h2>
            <p className="lead">Every engagement starts with a free consultation. We’ll recommend the right model for your stage and budget.</p>
          </div>
          <div className="models">
            {studio.models.map((m) => (
              <div className="model" key={m.title}>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--raised" id="start">
        <div className="wrap split split--top">
          <div>
            <span className="eyebrow">Start here</span>
            <h2 className="h-section">Tell us about your idea</h2>
            <p className="lead">
              A few lines is enough. We’ll read it properly, reply within 24 hours, and set up a free call to talk it through. Your idea stays confidential.
            </p>
            <div style={{ marginTop: 40 }}><Faq /></div>
          </div>
          <div className="studio-panel" style={{ background: 'var(--ink)' }}>
            <ContactForm variant="startup" />
          </div>
        </div>
      </section>
    </>
  );
}
