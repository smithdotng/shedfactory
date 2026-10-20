import { ImageResponse } from 'next/og';
import fs from 'node:fs';
import path from 'node:path';

const font = (w: number) => fs.readFileSync(path.join(process.cwd(), 'src/lib/fonts', `jost-latin-${w}-normal.woff`));

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

/** Branded 1200×630 share card used for Open Graph, Twitter and blog covers. */
export function ogImage({
  eyebrow,
  title,
  subtitle,
  accent = '#f7a072',
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent?: string;
}) {
  const size = title.length > 70 ? 56 : title.length > 45 ? 66 : 78;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          background: '#0e0d0c', color: '#f4efe8', padding: '70px 80px', position: 'relative', fontFamily: 'Jost',
        }}
      >
        <div
          style={{
            position: 'absolute', right: -180, top: -220, width: 720, height: 720, borderRadius: 720,
            background: `radial-gradient(circle, ${accent}66, transparent 68%)`, display: 'flex',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, fontWeight: 600 }}>
          <div style={{ width: 22, height: 22, borderRadius: 22, background: 'linear-gradient(100deg, #fcd116, #f7a072)', display: 'flex' }} />
          Shedfactory
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
          <div style={{ fontSize: 24, letterSpacing: 4, textTransform: 'uppercase', color: accent, fontWeight: 600, marginBottom: 22, display: 'flex' }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: size, fontWeight: 600, lineHeight: 1.08, letterSpacing: -2, display: 'flex' }}>{title}</div>
          {subtitle && <div style={{ fontSize: 28, color: '#a9a297', marginTop: 24, lineHeight: 1.4, display: 'flex' }}>{subtitle}</div>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 24, color: '#a9a297' }}>
          <span>shedfactory.co</span>
          <div style={{ height: 8, width: 260, borderRadius: 8, background: 'linear-gradient(100deg, #fcd116, #f7a072)', display: 'flex' }} />
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Jost', data: font(400), weight: 400, style: 'normal' },
        { name: 'Jost', data: font(600), weight: 600, style: 'normal' },
      ],
    },
  );
}
