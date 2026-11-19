'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { heroImage } from '@/lib/site-images'

const desktopLines = [
  { text: 'NYALA', className: 'hero-line hero-line-accent' },
  { text: 'SHOE &', className: 'hero-line hero-line-indent' },
  { text: 'LEATHER', className: 'hero-line' },
  { text: 'PRODUCTS FACTORY', className: 'hero-line hero-line-last' },
]
const mobileLines = ['SHOE &', 'LEATHER', 'PRODUCTS', 'FACTORY']

export function Hero() {
  const reduceMotion = useReducedMotion()
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    if (!document.querySelector('.intro-loader')) {
      setIntroComplete(true)
      return
    }

    const observer = new MutationObserver(() => {
      if (!document.querySelector('.intro-loader')) {
        setIntroComplete(true)
        observer.disconnect()
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return (
    <section className={`hero${introComplete ? ' is-intro-complete' : ''}`} aria-labelledby="hero-title">
      <Image className="hero-image" src={heroImage.src} alt={heroImage.alt} fill priority sizes="100vw" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content">
        <h1 id="hero-title" aria-label="NYALA SHOE & LEATHER PRODUCTS FACTORY">
          <span className="hero-desktop-headline" aria-hidden="true">
            {desktopLines.map((line, index) => (
              <motion.span
                className={line.className}
                key={line.text}
                initial={reduceMotion ? false : { opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : index * 0.12, ease: 'easeOut' }}
              >
                {line.text}
              </motion.span>
            ))}
          </span>
          <span className="hero-mobile-layout" aria-hidden="true">
            <span className="hero-mobile-vertical">
              <span className="hero-mobile-word">NYALA</span>
            </span>
            <span className="hero-mobile-right">
              <span className="hero-location">
                <span>ADDIS ABABA</span>
                <span className="hero-location-rule" />
              </span>
              <span className="hero-mobile-lines">
                {mobileLines.map((line) => <span className="hero-mobile-line" key={line}>{line}</span>)}
              </span>
            </span>
          </span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-actions">
            <Link className="button button-primary" href="/products">View Products</Link>
            <Link className="button button-outline" href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
