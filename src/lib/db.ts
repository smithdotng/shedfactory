import mongoose, { Schema, models, model } from 'mongoose';

// Reuse one connection across hot reloads and serverless invocations.
const g = globalThis as unknown as { _mongoose?: Promise<typeof mongoose> };

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');
  if (!g._mongoose) {
    g._mongoose = mongoose.connect(uri, { bufferCommands: false }).catch((err) => {
      g._mongoose = undefined;
      throw err;
    });
  }
  return g._mongoose;
}

// Same collections/fields as the original Express site, plus optional startup fields.
const subscriberSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  subscribedAt: { type: Date, default: Date.now },
});

const contactSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: String,
  subject: String,
  message: { type: String, required: true },
  type: { type: String, default: 'general' }, // 'general' | 'startup'
  company: String,
  stage: String,
  submittedAt: { type: Date, default: Date.now },
});

export const Subscriber = models.Subscriber || model('Subscriber', subscriberSchema);
export const Contact = models.Contact || model('Contact', contactSchema);

export const isEmail = (e: unknown): e is string =>
  typeof e === 'string' && e.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export const clean = (v: unknown, max = 5000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
