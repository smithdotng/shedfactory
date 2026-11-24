import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products, type Video } from '@/lib/content';

export default function VideoCard({ video, showMeta = true }: { video: Video; showMeta?: boolean }) {
  const product = products.find((p) => p.slug === video.product);
  return (
    <figure className="video-card" style={{ margin: 0 }}>
      <div className="video-card__frame">
        <video controls playsInline preload="none" poster={video.poster} aria-label={video.title}>
          <source src={video.src} type="video/mp4" />
          Your browser can’t play this video. <a href={video.src}>Download it</a> instead.
        </video>
      </div>
      {showMeta && (
        <figcaption className="video-card__meta">
          <span className="video-card__tag">{product ? product.domain : 'Shedfactory'} · {video.durationLabel}</span>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          {product && (
            <Link href={`/products/${product.slug}`} className="video-card__link">
              About {product.name} <ArrowRight size={15} />
            </Link>
          )}
        </figcaption>
      )}
    </figure>
  );
}

export function videoJsonLd(list: Video[], siteUrl: string) {
  return list.map((v) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.title,
    description: v.description,
    thumbnailUrl: `${siteUrl}${v.poster}`,
    contentUrl: `${siteUrl}${v.src}`,
    uploadDate: v.uploadDate,
    duration: v.duration,
  }));
}
