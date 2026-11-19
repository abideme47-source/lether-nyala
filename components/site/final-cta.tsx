'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const reduceMotion = useReducedMotion()

  return (
    <section className="final-cta-section" ref={sectionRef} aria-labelledby="final-cta-title">
      <motion.div
        className="final-cta-card"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={isInView || reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.65, ease: 'easeOut' }}
      >
        <div className="final-cta-copy">
          <h2 id="final-cta-title">Ready to order?</h2>
          <p>Call us today.</p>
        </div>
        <div className="final-cta-actions">
          <a className="button button-primary" href="tel:+251911606155">Call Now</a>
          <Link className="button button-outline" href="/contact">Contact Us</Link>
        </div>
      </motion.div>
    </section>
  )
}
