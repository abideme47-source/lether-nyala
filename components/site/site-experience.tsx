'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { TopScrollProgress } from '@/components/site/scroll-indicators'

const introDuration = 700
const brandLetters = ['N', 'Y', 'A', 'L', 'A']

export function SiteExperience({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const skipIntro = pathname === '/about' || pathname === '/products' || pathname === '/contact'
  const [reduceMotion, setReduceMotion] = useState(false)
  const [showIntro, setShowIntro] = useState(!skipIntro)
  const [introActive, setIntroActive] = useState(!skipIntro)
  const initialized = useRef(false)

  useEffect(() => {
    if (skipIntro) {
      setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      setShowIntro(false)
      setIntroActive(false)
      document.body.style.overflow = ''
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduceMotion(prefersReducedMotion)
    const isFirstSetup = !initialized.current
    initialized.current = true
    let alreadySeen = false

    try {
      alreadySeen = isFirstSetup && window.sessionStorage.getItem('nyala-intro-seen') === 'true'
      if (!alreadySeen && !prefersReducedMotion) {
        window.sessionStorage.setItem('nyala-intro-seen', 'true')
      }
    } catch {
      alreadySeen = false
    }

    if (prefersReducedMotion || alreadySeen) {
      setShowIntro(false)
      if (prefersReducedMotion) setIntroActive(false)
      return
    }

    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem('nyala-intro-seen', 'true')
      } catch {}
      setShowIntro(false)
    }, introDuration)
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [skipIntro])

  const content = showIntro || reduceMotion ? children : (
    <ReactLenis root options={{ lerp: 0.1, autoRaf: true }}>
      {children}
    </ReactLenis>
  )

  return (
    <>
      {content}
      {(pathname === '/' || pathname === '/about' || pathname === '/products' || pathname === '/contact') && <TopScrollProgress hidden={introActive} />}
      {!skipIntro && (
          <AnimatePresence onExitComplete={() => {
            document.body.style.overflow = ''
            setIntroActive(false)
          }}>
          {showIntro && !reduceMotion && (
            <motion.div
              className="intro-loader"
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              aria-label="Nyala"
              role="status"
            >
              <div className="intro-wordmark" aria-hidden="true">
                {brandLetters.map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, delay: index * 0.08, ease: 'easeOut' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  )
}
