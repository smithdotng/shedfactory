import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { products, services, work, testimonials, faqs, stats, processSteps } from '@/lib/content';

export function Stats() {
  return (
    <div className="stats">
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <div className="stat__value grad-text">{s.value}</div>
          <div className="stat__label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function ProductCards() {
  return (
    <div className="products">
      {products.map((p) => (
        <Link
          key={p.slug}
          href={`/products/${p.slug}`}
          className="product-card"
          style={{ ['--accent' as string]: p.accent }}
        >
          <div className="product-card__mark">{p.name[0]}</div>
          <span className="product-card__cat">{p.category}</span>
          <h3>{p.domain}</h3>
          <p className="product-card__tag">{p.tagline}</p>
          <p>{p.summary}</p>
          <div className="product-card__foot">
            Explore {p.name} <ArrowRight size={18} />
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ServiceGrid({ withCta = true }: { withCta?: boolean }) {
  return (
    <div className="services">
      {services.map((s, i) => (
        <Link key={s.slug} href={`/services/${s.slug}`} className="service-card">
          <span className="service-card__num">0{i + 1}</span>
          <h3>{s.title}</h3>
          <p>{s.short}</p>
          <span className="service-card__more">
            Learn more <ArrowUpRight size={16} />
          </span>
        </Link>
      ))}
      {withCta && (
        <Link href="/startups" className="service-card service-card--cta">
          <span className="service-card__num" style={{ color: '#1a1208' }}>06</span>
          <h3>Startup & Venture Building</h3>
          <p>Have an idea? We take it from napkin sketch to launched product — strategy, brand, build and growth.</p>
          <span className="service-card__more">
            Build with us <ArrowUpRight size={16} />
          </span>
        </Link>
      )}
    </div>
  );
}

export function WorkGrid({ limit }: { limit?: number }) {
  return (
    <div className="work">
      {work.slice(0, limit).map((w) => (
        <article className="work-card" key={w.client}>
          <div className="work-card__img">
            <img src={w.image} alt={`${w.client} project`} loading="lazy" />
          </div>
          <div className="work-card__body">
            <span className="work-card__tags">{w.tags}</span>
            <h3>{w.client}</h3>
            <p>{w.summary}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <div className="quotes">
      {testimonials.map((t) => (
        <figure className="quote" key={t.name}>
          <span className="quote__mark grad-text">“</span>
          <blockquote>{t.quote}</blockquote>
          <figcaption>
            <strong>{t.name}</strong>
            <span className="muted">{t.org}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function Faq() {
  return (
    <div className="faq">
      {faqs.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function ProcessSteps() {
  return (
    <div className="steps">
      {processSteps.map((p) => (
        <div className="step" key={p.step}>
          <span className="step__num">{p.step}</span>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
        </div>
      ))}
    </div>
  );
}
