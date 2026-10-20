import type { Metadata } from 'next';
import { Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { site } from '@/lib/content';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Ready to bring your dream to life? Get in touch with Shedfactory in the UK or Nigeria to start your project.',
};

export default function Contact() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        eyebrow="Get in touch"
        title={<>Let’s bring your <span className="grad-text">vision to life.</span></>}
        lead="Whether you’re a startup with a bold idea or an established business ready for a digital transformation, we’d love to hear from you."
        bg="/assets/images/backgrounds/page-header-bg-contact.jpg"
      />
      <section className="section">
        <div className="wrap split split--top split--contact">
          <div className="studio-panel">
            <h2 style={{ fontSize: 28 }}>Send us a message</h2>
            <p className="muted" style={{ marginBottom: 28 }}>We reply within 24 hours.</p>
            <ContactForm />
          </div>
          <div className="contact-cards">
            {site.offices.map((o) => (
              <div className="contact-card" key={o.label}>
                <h3><MapPin size={18} color="var(--peach)" /> {o.label}</h3>
                <p>{o.lines.map((l) => <span key={l}>{l}<br /></span>)}</p>
              </div>
            ))}
            <div className="contact-card">
              <h3><MessageCircle size={18} color="var(--peach)" /> WhatsApp / Phone</h3>
              <p><a href={site.whatsapp}>{site.phone}</a></p>
            </div>
            <div className="contact-card">
              <h3><Mail size={18} color="var(--peach)" /> Email</h3>
              <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
            </div>
            <div className="contact-card">
              <h3><Clock size={18} color="var(--peach)" /> Hours</h3>
              <p>{site.hours.map((h) => <span key={h}>{h}<br /></span>)}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
