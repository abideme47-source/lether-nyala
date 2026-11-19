import Link from 'next/link'
import { contactDetails } from '@/lib/contact'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-columns">
          <nav aria-label="Quick links" className="footer-column footer-links">
            <h2>Quick Links</h2>
            {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </nav>
          <section className="footer-column" aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title">Contact</h2>
            <div className="footer-contact-list">
              {contactDetails.mobile.map((number) => (
                <a key={number} href={`tel:${number}`}>{number}</a>
              ))}
              {contactDetails.telephone.map((number) => (
                <a key={number} href={`tel:${number}`}>{number}</a>
              ))}
            </div>
          </section>
          <section className="footer-column" aria-labelledby="footer-location-title">
            <h2 id="footer-location-title">Location</h2>
            <p>Addis Ababa, Ethiopia</p>
          </section>
        </div>
        <div className="footer-divider" />
        <Link className="footer-wordmark" href="/" aria-label="Nyala home">
          <svg viewBox="0 0 1000 220" role="img" aria-labelledby="footer-wordmark-title" preserveAspectRatio="none">
            <title id="footer-wordmark-title">NYALA</title>
            <text x="500" y="210" textAnchor="middle" textLength="1000" lengthAdjust="spacingAndGlyphs">NYALA</text>
          </svg>
        </Link>
      </div>
    </footer>
  )
}
