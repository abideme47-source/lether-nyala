'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
]

export function AboutNavigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }

      if (event.key !== 'Tab') return
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>('button, a[href]')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="about-nav">
        <Link className="about-nav-logo" href="/" aria-label="Nyala home">NYALA</Link>
        <nav className="about-nav-desktop" aria-label="Primary navigation">
          {navigationLinks.map(({ label, href }) => (
            <Link
              aria-current={href === pathname ? 'page' : undefined}
              className={`about-nav-link${href === pathname ? ' is-current' : ''}`}
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </nav>
        <button
          aria-controls="about-mobile-menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="about-nav-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <Menu aria-hidden="true" />
        </button>
      </header>
      <nav
        aria-hidden={!menuOpen}
        aria-label="Mobile navigation"
        className="about-mobile-menu"
        hidden={!menuOpen}
        id="about-mobile-menu"
        inert={!menuOpen}
        ref={menuRef}
      >
        <button
          aria-label="Close navigation menu"
          className="about-menu-close"
          onClick={closeMenu}
          ref={closeButtonRef}
          type="button"
        >
          <X aria-hidden="true" />
        </button>
        <div className="about-mobile-links">
          {navigationLinks.map(({ label, href }) => (
            <Link
              aria-current={href === pathname ? 'page' : undefined}
              className={`about-mobile-link${href === pathname ? ' is-current' : ''}`}
              href={href}
              key={href}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
