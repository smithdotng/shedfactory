import { NextResponse } from 'next/server';
import { connectDB, Subscriber, isEmail } from '@/lib/db';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!isEmail(email)) {
    return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    await connectDB();
    const existing = await Subscriber.findOne({ email });
    if (existing) return NextResponse.json({ success: false, message: 'You’re already subscribed.' });
    await Subscriber.create({ email });
    return NextResponse.json({ success: true, message: 'Thank you for subscribing!' });
  } catch (err) {
    console.error('Error saving subscriber:', err);
    return NextResponse.json({ success: false, message: 'Server error. Please try again.' }, { status: 500 });
  }
}
