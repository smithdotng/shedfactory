import { pageMeta } from '@/lib/seo';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import { WorkGrid, Testimonials, ProductCards } from '@/components/Sections';

export const metadata = pageMeta({
  title: 'Our Work',
  description: 'Selected Shedfactory projects for hotels, healthcare, logistics and community organisations — plus the platforms we run ourselves.',
  path: '/work',
});

export default function Work() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Work' }]}
        eyebrow="Featured work"
        title={<>Dreams we’ve <span className="grad-text">brought to life.</span></>}
        lead="Brands, websites, booking engines and portals for businesses across the UK and Nigeria."
      />
      <section className="section">
        <div className="wrap"><WorkGrid /></div>
      </section>
      <section className="section section--cream">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Our own products</span>
            <h2 className="h-section">Built, launched and run by us</h2>
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
