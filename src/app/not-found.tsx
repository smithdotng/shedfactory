import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
      <div className="wrap">
        <span className="eyebrow">404</span>
        <h1 className="h-section">This page isn’t here.</h1>
        <p className="lead" style={{ margin: '0 auto 30px' }}>But your next idea could be. Let’s get you back on track.</p>
        <div className="btn-row" style={{ justifyContent: 'center' }}>
          <Link href="/" className="btn btn--primary">Back home</Link>
          <Link href="/contact" className="btn btn--ghost">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
