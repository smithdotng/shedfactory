import Link from 'next/link';
import { site, products, services } from '@/lib/content';
import NewsletterForm from './NewsletterForm';
import { SocialIcon } from './SocialIcons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <img src="/assets/images/resources/shedfactory_logo.png" alt="Shedfactory" width={160} height={52} />
            <p className="muted" style={{ marginTop: 18, fontSize: 15, maxWidth: 300 }}>
              A digital creative agency and product studio. We build our own platforms, and we help founders and companies build theirs.
            </p>
            <div className="social">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><SocialIcon name="facebook" /></a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><SocialIcon name="instagram" /></a>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><SocialIcon name="linkedin" /></a>
            </div>
          </div>
          <div>
            <h4>Products</h4>
            <ul className="footer__links">
              {products.map((p) => (
                <li key={p.slug}><Link href={`/products/${p.slug}`}>{p.domain}</Link></li>
              ))}
              <li><Link href="/startups">Build with us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul className="footer__links">
              {services.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.title.replace(' & Identity', '')}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            {site.offices.map((o) => (
              <p className="footer__office" key={o.label}>
                <strong>{o.label}</strong>
                {o.lines.join(', ')}
              </p>
            ))}
            <p className="footer__office">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              <a href={site.whatsapp}>{site.phone} (WhatsApp)</a>
            </p>
            <h4 style={{ marginTop: 28 }}>Newsletter</h4>
            <NewsletterForm />
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
          <span>{site.hours[0]}</span>
        </div>
      </div>
    </footer>
  );
}
