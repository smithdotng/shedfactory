import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import { ProductCards } from '@/components/Sections';

export const metadata = pageMeta({
  title: 'Our Products',
  description: 'Diner.ng, Glee.ng, Found.ng, Haulage.ng and 74 Tribe Studios — platforms designed, built and run by Shedfactory.',
  path: '/products',
});

export default function Products() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Products' }]}
        eyebrow="Built and run by Shedfactory"
        title={<>Platforms we <span className="grad-text">own and operate.</span></>}
        lead="We design, engineer and run our own products. Each one solves a real everyday problem in Nigeria — and each one makes us better at building yours."
      />
      <section className="section section--cream">
        <div className="wrap"><ProductCards /></div>
      </section>
      <section className="section">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Why it matters to you</span>
            <h2 className="h-section">Founder-side experience, applied to your idea.</h2>
          </div>
          <div>
            <p className="lead">
              Running our own platforms means we deal with the same things you will: onboarding the first users, pricing, payments, support, uptime and growth. That experience goes into every product we build for clients.
            </p>
            <Link href="/startups" className="btn btn--primary">Build with us <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
      <CtaBand title="Want to list your business on one of our platforms?" text="Restaurants, beauty professionals, realtors, logistics operators and creators can join our platforms today — or talk to us about a partnership." label="Talk to us" />
    </>
  );
}
