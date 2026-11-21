'use client'

import Link from 'next/link'
import { useLenis } from 'lenis/react'
import { useEffect, useRef, useState } from 'react'
import { contactDetails } from '@/lib/contact'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  const lenis = useLenis()
  const footerRef = useRef<HTMLElement>(null)
  const wordmarkSvgRef = useRef<SVGSVGElement>(null)
  const wordmarkTextRef = useRef<SVGTextElement>(null)
  const [wordmarkViewBox, setWordmarkViewBox] = useState('0 -160 720 180')
  const [tallWordmark, setTallWordmark] = useState(false)

  useEffect(() => {
    const footer = footerRef.current
    const wordmarkSvg = wordmarkSvgRef.current
    const wordmarkText = wordmarkTextRef.current
    const footerContent = footer?.querySelector('.footer-content')
    const wordmark = footerContent?.querySelector('.footer-wordmark')
    const nextElement = footer?.nextElementSibling

    if (!footer || !footerContent || !wordmark || !wordmarkSvg || !wordmarkText || !(nextElement instanceof HTMLElement) || !nextElement.classList.contains('footer-reveal-spacer')) return

    const spacer = nextElement
    const getFooterHeight = () => {
      const footerRect = footer.getBoundingClientRect()
      const contentBottom = wordmark.getBoundingClientRect().bottom - footerRect.top
      const bottomPadding = Number.parseFloat(getComputedStyle(footer).paddingBottom) || 0
      return Math.max(footerRect.height, contentBottom + bottomPadding)
    }
    let disposed = false
    let resizeFrame = 0
    let heightDisabledForViewport = false
    let viewportKey = `${window.innerWidth}:${window.innerHeight}`
    let lastFooterHeight = getFooterHeight()
    let lastSpacerHeight = Number.parseFloat(spacer.style.height) || 0

    const resizeLenis = () => {
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame)
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0
        lenis?.resize()
      })
    }

    const setRevealDisabled = (disabled: boolean) => {
      footer.classList.toggle('footer-reveal-disabled', disabled)
      spacer.hidden = disabled
      if (disabled) spacer.style.height = '0px'
    }

    const measureFooter = () => {
      const currentViewportKey = `${window.innerWidth}:${window.innerHeight}`
      if (currentViewportKey !== viewportKey) {
        viewportKey = currentViewportKey
        heightDisabledForViewport = false
      }

      if (window.innerWidth < 1024) {
        setRevealDisabled(true)
      } else if (heightDisabledForViewport) {
        setRevealDisabled(true)
      } else {
        setRevealDisabled(false)
        const measuredHeight = getFooterHeight()
        if (measuredHeight > window.innerHeight * 0.85) {
          heightDisabledForViewport = true
          setRevealDisabled(true)
        } else {
          spacer.hidden = false
          const measuredSpacerHeight = `${measuredHeight}px`
          if (spacer.style.height !== measuredSpacerHeight) spacer.style.height = measuredSpacerHeight
        }
      }

      const currentFooterHeight = getFooterHeight()
      const currentSpacerHeight = spacer.hidden ? 0 : Number.parseFloat(spacer.style.height) || 0
      const footerChanged = Math.abs(currentFooterHeight - lastFooterHeight) > 0.5
      const spacerChanged = Math.abs(currentSpacerHeight - lastSpacerHeight) > 0.5
      lastFooterHeight = currentFooterHeight
      lastSpacerHeight = currentSpacerHeight

      if (footerChanged || spacerChanged) resizeLenis()
    }

    const measureWordmark = () => {
      const mobile = window.matchMedia('(max-width: 767px)').matches
      setTallWordmark(mobile)
      const bounds = wordmarkText.getBBox()
      if (!bounds.width || !bounds.height) return
      const scaleY = mobile ? 1.35 : 1
      const xPadding = bounds.width * 0.02
      const y = bounds.y * scaleY
      const height = bounds.height * scaleY
      const yPadding = height * 0.02
      setWordmarkViewBox(`${bounds.x - xPadding} ${y - yPadding} ${bounds.width + xPadding * 2} ${height + yPadding * 2}`)
      resizeLenis()
    }

    const onFontsLoaded = () => {
      if (disposed) return
      measureWordmark()
      measureFooter()
      resizeLenis()
    }

    measureWordmark()
    measureFooter()

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(measureFooter)
      : null
    resizeObserver?.observe(footer)
    resizeObserver?.observe(footerContent)
    resizeObserver?.observe(wordmarkSvg)
    const onResize = () => {
      measureWordmark()
      measureFooter()
    }
    window.addEventListener('resize', onResize)
    document.fonts.addEventListener('loadingdone', onFontsLoaded)
    void document.fonts.ready.then(onFontsLoaded)

    return () => {
      disposed = true
      resizeObserver?.disconnect()
      window.removeEventListener('resize', onResize)
      document.fonts.removeEventListener('loadingdone', onFontsLoaded)
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame)
    }
  }, [lenis])

  return (
    <footer className="site-footer" ref={footerRef}>
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
        <div className="footer-brand">
          <Link className="footer-wordmark" href="/" aria-label="Nyala home">
            <svg
              ref={wordmarkSvgRef}
              aria-labelledby="footer-wordmark-title"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              viewBox={wordmarkViewBox}
            >
              <title id="footer-wordmark-title">NYALA</title>
              <text ref={wordmarkTextRef} transform={tallWordmark ? 'scale(1 1.35)' : undefined} x="0" y="0">NYALA</text>
            </svg>
          </Link>
          <a className="footer-credit" href="https://t.me/RahwaDigitals" target="_blank" rel="noopener noreferrer" aria-label="Site by Rahwa Digitals (opens Telegram)">
            Site by Rahwa Digitals
          </a>
        </div>
      </div>
    </footer>
  )
}
