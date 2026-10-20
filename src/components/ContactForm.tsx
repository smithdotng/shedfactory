'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

type Variant = 'general' | 'startup';

export default function ContactForm({ variant = 'general' }: { variant?: Variant }) {
  const [status, setStatus] = useState<'idle' | 'busy' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    setStatus('busy');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, type: variant }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('ok');
        setMsg('Thank you — we’ve received your message and will get back to you within 24 hours.');
        form.reset();
      } else {
        setStatus('err');
        setMsg(data.message || 'Please fill in all required fields.');
      }
    } catch {
      setStatus('err');
      setMsg('Something went wrong. Please try again, or email hello@shedfactory.co.');
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="name">Your name *</label>
        <input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="phone">Phone / WhatsApp</label>
        <input id="phone" name="phone" autoComplete="tel" />
      </div>
      {variant === 'startup' ? (
        <div className="field">
          <label htmlFor="stage">Where are you now?</label>
          <select id="stage" name="stage" defaultValue="Just an idea">
            <option>Just an idea</option>
            <option>Validating with customers</option>
            <option>Designing / have a prototype</option>
            <option>Ready to build an MVP</option>
            <option>Live and looking to grow</option>
          </select>
        </div>
      ) : (
        <div className="field">
          <label htmlFor="subject">Subject</label>
          <input id="subject" name="subject" />
        </div>
      )}
      {variant === 'startup' && (
        <div className="field full">
          <label htmlFor="company">Company or project name</label>
          <input id="company" name="company" />
        </div>
      )}
      <div className="field full">
        <label htmlFor="message">{variant === 'startup' ? 'Tell us about your idea *' : 'Your message *'}</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder={
            variant === 'startup'
              ? 'What problem are you solving, who is it for, and what would success look like?'
              : 'How can we help?'
          }
        />
      </div>
      {status === 'ok' && <p className="form-note form-note--ok" role="status">{msg}</p>}
      {status === 'err' && <p className="form-note form-note--err" role="alert">{msg}</p>}
      <div className="full">
        <button className="btn btn--primary" type="submit" disabled={status === 'busy'}>
          {status === 'busy' ? 'Sending…' : variant === 'startup' ? 'Send my idea' : 'Send message'} <Send size={17} />
        </button>
      </div>
    </form>
  );
}
