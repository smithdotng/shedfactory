import type { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import { connectDB, Contact, Subscriber } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Admin', robots: { index: false, follow: false } };

type ContactDoc = {
  _id: { toString(): string };
  name: string; email: string; phone?: string; subject?: string; message: string;
  type?: string; stage?: string; submittedAt: Date;
};
type SubDoc = { _id: { toString(): string }; email: string; subscribedAt: Date };

async function deleteContact(formData: FormData) {
  'use server';
  await connectDB();
  await Contact.findByIdAndDelete(String(formData.get('id')));
  revalidatePath('/admin');
}

async function deleteSubscriber(formData: FormData) {
  'use server';
  await connectDB();
  await Subscriber.findByIdAndDelete(String(formData.get('id')));
  revalidatePath('/admin');
}

const fmt = (d: Date) => new Date(d).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });

export default async function Admin() {
  let contacts: ContactDoc[] = [];
  let subscribers: SubDoc[] = [];
  let error = '';
  try {
    await connectDB();
    contacts = (await Contact.find().sort({ submittedAt: -1 }).lean()) as unknown as ContactDoc[];
    subscribers = (await Subscriber.find().sort({ subscribedAt: -1 }).lean()) as unknown as SubDoc[];
  } catch (e) {
    error = e instanceof Error ? e.message : 'Database error';
  }

  return (
    <section className="section">
      <div className="wrap">
        <h1 className="h-section">Admin dashboard</h1>
        {error && <p className="form-note form-note--err">{error}</p>}

        <h2 style={{ fontSize: 24, marginTop: 40 }}>Messages ({contacts.length})</h2>
        <div className="admin-scroll">
          <table className="admin-table">
            <thead>
              <tr><th>Date</th><th>Type</th><th>From</th><th>Subject / stage</th><th>Message</th><th /></tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id.toString()}>
                  <td style={{ whiteSpace: 'nowrap' }}>{fmt(c.submittedAt)}</td>
                  <td>{c.type === 'startup' ? 'Startup' : 'General'}</td>
                  <td>{c.name}<br /><a href={`mailto:${c.email}`} className="muted">{c.email}</a>{c.phone && <><br /><span className="muted">{c.phone}</span></>}</td>
                  <td>{c.subject}{c.stage && <><br /><span className="muted">{c.stage}</span></>}</td>
                  <td style={{ maxWidth: 420, whiteSpace: 'pre-wrap' }}>{c.message}</td>
                  <td>
                    <form action={deleteContact}><input type="hidden" name="id" value={c._id.toString()} /><button className="link-btn">Delete</button></form>
                  </td>
                </tr>
              ))}
              {!contacts.length && <tr><td colSpan={6} className="muted">No messages yet.</td></tr>}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 24, marginTop: 50 }}>Newsletter subscribers ({subscribers.length})</h2>
        <div className="admin-scroll">
          <table className="admin-table">
            <thead><tr><th>Email</th><th>Subscribed</th><th /></tr></thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s._id.toString()}>
                  <td>{s.email}</td>
                  <td>{fmt(s.subscribedAt)}</td>
                  <td><form action={deleteSubscriber}><input type="hidden" name="id" value={s._id.toString()} /><button className="link-btn">Delete</button></form></td>
                </tr>
              ))}
              {!subscribers.length && <tr><td colSpan={3} className="muted">No subscribers yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
