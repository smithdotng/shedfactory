'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/startups', label: 'For Startups' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
    <header className="header">
      <div className="wrap header__inner">
        <Link href="/" className="header__logo" aria-label="Shedfactory home">
          <img src="/assets/images/resources/shedfactory_logo.png" alt="Shedfactory" width={170} height={55} />
        </Link>
        <nav className="nav" aria-label="Main">
          {links.slice(1).map((l) => (
            <Link key={l.href} href={l.href} className={`nav__link${isActive(l.href) ? ' is-active' : ''}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/startups#start" className="btn btn--primary header__cta">
          Start a project
        </Link>
        <button className="menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
      <div className={`mobile-nav${open ? ' is-open' : ''}`}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="mobile-nav__link">
            {l.label}
          </Link>
        ))}
        <Link href="/startups#start" className="btn btn--primary">
          Start a project
        </Link>
      </div>
    </>
  );
}
