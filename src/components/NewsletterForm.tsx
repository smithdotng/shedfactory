'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function NewsletterForm() {
  const [state, setState] = useState<{ status: 'idle' | 'busy' | 'ok' | 'err'; msg?: string }>({ status: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get('email');
    setState({ status: 'busy' });
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setState({ status: data.success ? 'ok' : 'err', msg: data.message });
      if (data.success) form.reset();
    } catch {
      setState({ status: 'err', msg: 'Something went wrong. Please try again.' });
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="newsletter">
        <input type="email" name="email" placeholder="Email address" required aria-label="Email address" />
        <button type="submit" aria-label="Subscribe" disabled={state.status === 'busy'}>
          <ArrowRight size={18} />
        </button>
      </div>
      {state.msg && (
        <p className="newsletter-msg" style={{ color: state.status === 'ok' ? '#7be3b6' : '#ff9a82' }}>
          {state.msg}
        </p>
      )}
    </form>
  );
}
