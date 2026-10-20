import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import { ServiceGrid, ProcessSteps, Stats } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Brand strategy, web and app development, UI/UX design, digital marketing, content creation and startup venture building.',
};

const industries = ['Hospitality & Travel', 'Healthcare & Wellness', 'Professional Services', 'Retail & E-commerce', 'Real Estate', 'Logistics', 'Food & Beverage', 'Beauty'];

export default function Services() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services' }]}
        eyebrow="What we do"
        title={<>Everything a dream needs to <span className="grad-text">go live.</span></>}
        lead="Strategy, brand, design, engineering and marketing — under one roof, so nothing gets lost between agencies."
        bg="/assets/images/backgrounds/page-header-bg-services.jpg"
      />
      <section className="section">
        <div className="wrap"><ServiceGrid /></div>
      </section>
      <section className="section section--raised">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">How we work</span>
            <h2 className="h-section">A process built on partnership</h2>
          </div>
          <ProcessSteps />
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Industries</span>
            <h2 className="h-section">Experience across 25+ industries</h2>
            <p className="lead">We’ve worked with businesses across the UK and Nigeria, including:</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 60 }}>
            {industries.map((i) => (
              <span key={i} style={{ padding: '10px 20px', borderRadius: 999, border: '1px solid var(--line)' }}>{i}</span>
            ))}
          </div>
          <Stats />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
