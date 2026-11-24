import { pageMeta } from '@/lib/seo';
import { videos, site } from '@/lib/content';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import VideoCard, { videoJsonLd } from '@/components/VideoCard';

export const metadata = pageMeta({
  title: 'Videos',
  description: 'Short films about the products Shedfactory builds and runs — including Diner.ng and EduInsight.',
  path: '/videos',
  image: '/og/videos.jpg',
});

export default function Videos() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd(videos, site.url)) }} />
      <PageHero
        crumbs={[{ label: 'Videos' }]}
        eyebrow="Watch"
        title={<>Our products, <span className="grad-text">in motion.</span></>}
        lead="Short films about the platforms we design, build and run. Tap play, turn the sound up, and see what each one does."
      />
      <section className="section">
        <div className="wrap">
          <div className="videos">
            {videos.map((v) => (
              <VideoCard key={v.slug} video={v} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Want a promo video for your product?" text="We make short product films like these as part of our content and marketing work." label="Talk to us" />
    </>
  );
}
