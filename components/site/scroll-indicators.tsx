'use client'

import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'products', label: 'Our Products' },
  { id: 'about-teaser', label: 'About' },
  { id: 'why-choose-us', label: 'Why Choose Us' },
  { id: 'gallery', label: 'Gallery' },
]

export function TopScrollProgress({ hidden }: { hidden: boolean }) {
  const { scrollYProgress } = useScroll()
  const reduceMotion = useReducedMotion() === true

  if (reduceMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      className="top-scroll-progress"
      style={{ scaleX: scrollYProgress, visibility: hidden ? 'hidden' : 'visible' }}
    />
  )
}

export function HomeSectionDots() {
  const lenis = useLenis()
  const reduceMotion = useReducedMotion() === true
  const [activeIndex, setActiveIndex] = useState(0)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.45
      let nextIndex = 0

      sections.forEach(({ id }, index) => {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= marker) nextIndex = index
      })

      setActiveIndex((current) => current === nextIndex ? current : nextIndex)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    const footerSpacer = document.querySelector('.footer-reveal-spacer')
    const footerObserver = footerSpacer && typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting))
      : null

    if (footerSpacer) footerObserver?.observe(footerSpacer)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
      footerObserver?.disconnect()
    }
  }, [])

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (!section) return

    if (lenis) {
      lenis.scrollTo(section, { duration: reduceMotion ? 0 : 1.2 })
      return
    }

    section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  if (footerVisible) return null

  return (
    <nav aria-label="Page sections" className="home-section-dots">
      {sections.map(({ id, label }, index) => (
        <button
          aria-current={activeIndex === index ? 'location' : undefined}
          aria-label={label}
          className={`home-section-dot${activeIndex === index ? ' is-active' : ''}`}
          key={id}
          onClick={() => scrollToSection(id)}
          type="button"
        >
          <span aria-hidden="true" className="home-section-dot-mark" />
          <span aria-hidden="true" className="home-section-dot-label">{label}</span>
        </button>
      ))}
    </nav>
  )
}
