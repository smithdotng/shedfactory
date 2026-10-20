import { NextResponse } from 'next/server';
import { connectDB, Contact, isEmail, clean } from '@/lib/db';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
  }

  const name = clean(body.name, 200);
  const email = clean(body.email, 254);
  const message = clean(body.message, 8000);
  if (!name || !message || !isEmail(email)) {
    return NextResponse.json({ success: false, message: 'Please fill in your name, a valid email and a message.' }, { status: 400 });
  }

  const type = body.type === 'startup' ? 'startup' : 'general';
  const stage = clean(body.stage, 120);
  const company = clean(body.company, 200);

  try {
    await connectDB();
    await Contact.create({
      name,
      email,
      phone: clean(body.phone, 60),
      subject: type === 'startup' ? `Startup enquiry${company ? `: ${company}` : ''}` : clean(body.subject, 200),
      message,
      type,
      company,
      stage,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error saving contact:', err);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
}
