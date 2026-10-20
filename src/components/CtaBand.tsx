import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CtaBand({
  title = 'Ready to bring your dream to life?',
  text = 'Tell us about your idea, brand or product. We’ll reply within 24 hours.',
  href = '/contact',
  label = 'Start your project',
}: { title?: string; text?: string; href?: string; label?: string }) {
  return (
    <section className="section--tight">
      <div className="wrap">
        <div className="cta-band">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <Link href={href} className="btn btn--dark">
            {label} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
