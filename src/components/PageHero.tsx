import Link from 'next/link';

export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  bg,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  crumbs?: { href?: string; label: string }[];
  bg?: string;
}) {
  return (
    <section className="page-hero">
      {bg && <div className="page-hero__bg" style={{ backgroundImage: `url(${bg})` }} />}
      <div className="wrap">
        {crumbs && (
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label}>
                / {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}
