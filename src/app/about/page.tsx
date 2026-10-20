import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import { Stats, Testimonials, ProductCards } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Shedfactory’s story: ten years of turning dreams into brands, websites and platforms across the UK and Nigeria.',
};

const values = [
  { title: 'Every dream matters', text: 'Big or small, every idea gets our full attention and honest advice.', img: '/assets/images/philosophy/vision.jpg' },
  { title: 'True partnership', text: 'We become an extension of your team, not just a supplier on a project.', img: '/assets/images/philosophy/partnership.jpg' },
  { title: 'Creative excellence', text: 'Strategy, design and engineering held to the same high standard.', img: '/assets/images/philosophy/excellence.jpg' },
];

export default function About() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About' }]}
        eyebrow="Our story"
        title={<>Ten years of bringing <span className="grad-text">dreams to digital life.</span></>}
        lead="Shedfactory was founded on a simple belief: every great business starts with a dream, but dreams need the right partner to become reality."
        bg="/assets/images/backgrounds/page-header-bg-about.jpg"
      />
      <section className="section">
        <div className="wrap split">
          <div>
            <p className="lead" style={{ color: 'var(--text)' }}>
              For a decade we’ve been that partner — bridging the gap between visionary ideas and exceptional digital experiences for businesses across the UK and Nigeria.
            </p>
            <p className="muted">
              Our clients bring the passion and the vision. We bring the creative and technical expertise to turn abstract concepts into compelling brands, engaging websites, powerful web applications and results-driven marketing.
            </p>
            <p className="muted">
              Along the way we started building our own products. Diner, Glee, Found, Haulage and 74 Tribe are live platforms we design, engineer and operate ourselves — which means when we advise a founder, we’re speaking from experience.
            </p>
            <ul className="check-list">
              {['Offices in the UK and Nigeria', 'Partnership approach, not just projects', 'From brand strategy to hosting and support'].map((t) => (
                <li key={t}><Check size={18} /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="service-img">
            <img src="/assets/images/about/shedfactory-team.jpg" alt="The Shedfactory team at work" />
          </div>
        </div>
      </section>
      <div className="wrap"><Stats /></div>
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">What we believe</span>
            <h2 className="h-section">The principles behind every project</h2>
          </div>
          <div className="values">
            {values.map((v) => (
              <div className="value" key={v.title}>
                <img src={v.img} alt="" loading="lazy" />
                <div className="value__body">
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--cream">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Built by us</span>
            <h2 className="h-section">Our products</h2>
          </div>
          <ProductCards />
        </div>
      </section>
      <section className="section section--cream" style={{ paddingTop: 0 }}>
        <div className="wrap"><Testimonials /></div>
      </section>
      <CtaBand />
    </>
  );
}
