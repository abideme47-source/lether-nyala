'use client'

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { heroImage } from '@/lib/site-images'

type FrameMetrics = {
  startWidth: number
  startHeight: number
  fullWidth: number
  fullHeight: number
}

type ActiveCopy = 'statement' | 'part1' | 'part2' | null

const statementWords = 'Made in Addis Ababa. Built to last.'.split(' ')

function StatementWord({ word, index, progress, reducedMotion }: {
  word: string
  index: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  reducedMotion: boolean
}) {
  const start = 0.3 + index * 0.012
  const opacity = useTransform(progress, [start, start + 0.02], [0, 1])
  const y = useTransform(progress, [start, start + 0.02], [12, 0])

  return (
    <motion.span aria-hidden="true" className="about-statement-word" style={reducedMotion ? undefined : { opacity, y }}>
      {word}
    </motion.span>
  )
}

export function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion() === true
  const [metrics, setMetrics] = useState<FrameMetrics | null>(null)
  const [activeCopy, setActiveCopy] = useState<ActiveCopy>('statement')
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const photoWidth = useTransform(scrollYProgress, [0, 0.3], [metrics?.startWidth ?? 0, metrics?.fullWidth ?? 0])
  const photoHeight = useTransform(scrollYProgress, [0, 0.3], [metrics?.startHeight ?? 0, metrics?.fullHeight ?? 0])
  const photoRadius = useTransform(scrollYProgress, [0, 0.3], [16, 0])
  const [part2ButtonsVisible, setPart2ButtonsVisible] = useState(false)
  const imageScale = useTransform(scrollYProgress, [0, 0.25, 0.4], [1.15, 1.05, 1.05])
  const imageBlur = useTransform(scrollYProgress, [0.25, 0.4], ['blur(0px)', 'blur(5px)'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.12, 0.45])
  const statementOpacity = useTransform(scrollYProgress, [0.3, 0.32, 0.45, 0.55], [0, 1, 1, 0])
  const part1Opacity = useTransform(scrollYProgress, [0.55, 0.58, 0.65, 0.75], [0, 1, 1, 0])
  const part1Y = useTransform(scrollYProgress, [0.55, 0.59], [12, 0])
  const part2Opacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1])
  const part2Y = useTransform(scrollYProgress, [0.75, 0.85], [12, 0])
  const part2ButtonsOpacity = useTransform(scrollYProgress, [0.85, 0.93], [0, 1])
  const part2ButtonsY = useTransform(scrollYProgress, [0.85, 0.93], [12, 0])

  useEffect(() => {
    const updateMetrics = () => {
      const pin = pinRef.current
      if (!pin) return

      const width = pin.clientWidth
      const height = pin.clientHeight
      const isMobile = window.matchMedia('(max-width: 767px)').matches
      setMetrics({
        startWidth: width * (isMobile ? 0.6 : 0.3),
        startHeight: height * (isMobile ? 0.28 : 0.24),
        fullWidth: width,
        fullHeight: height,
      })
    }

    updateMetrics()
    const pin = pinRef.current
    let observer: ResizeObserver | undefined
    if (typeof ResizeObserver !== 'undefined' && pin) {
      observer = new ResizeObserver(updateMetrics)
      observer.observe(pin)
    }
    window.addEventListener('resize', updateMetrics)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', updateMetrics)
    }
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    setPart2ButtonsVisible(progress >= 0.85)

    if (progress >= 0.75) {
      setActiveCopy('part2')
    } else if (progress >= 0.55) {
      setActiveCopy('part1')
    } else if (progress >= 0.3) {
      setActiveCopy('statement')
    } else {
      setActiveCopy(null)
    }
  })

  const frameStyle = reducedMotion || !metrics
    ? undefined
    : { width: photoWidth, height: photoHeight, borderRadius: photoRadius }

  return (
    <section
      aria-label="About Nyala"
      className={`about-story${reducedMotion ? ' about-story-static' : ''}`}
      ref={sectionRef}
    >
      <div className="about-story-pin" ref={pinRef}>
        <div className="about-photo-layer">
          <motion.div className="about-photo-frame" style={frameStyle}>
            <motion.div className="about-photo-image" style={reducedMotion ? undefined : { scale: imageScale, filter: imageBlur }}>
              <Image
                alt="Leather craftsman hand-stitching a shoe in a workshop"
                className="about-photo"
                fill
                priority
                sizes="100vw"
                src={heroImage.src}
              />
            </motion.div>
            <motion.div
              aria-hidden="true"
              className="about-photo-shade"
              style={reducedMotion ? undefined : { opacity: overlayOpacity }}
            />
          </motion.div>
        </div>

        <div className="about-story-copy">
          <motion.div
            aria-hidden={!reducedMotion && activeCopy !== 'statement'}
            className="about-copy-block about-statement-block"
            inert={!reducedMotion && activeCopy !== 'statement'}
            style={reducedMotion ? undefined : { opacity: statementOpacity }}
          >
            <p className="about-story-label">About us</p>
            <h1 aria-label="Made in Addis Ababa. Built to last." className="about-statement-title">
              <span className="about-statement-words">
                {statementWords.map((word, index) => (
                  <StatementWord
                    index={index}
                    key={`${word}-${index}`}
                    progress={scrollYProgress}
                    reducedMotion={reducedMotion}
                    word={word}
                  />
                ))}
              </span>
            </h1>
          </motion.div>

          <motion.div
            aria-hidden={!reducedMotion && activeCopy !== 'part1'}
            className="about-copy-block about-story-part"
            inert={!reducedMotion && activeCopy !== 'part1'}
            style={reducedMotion ? undefined : { opacity: part1Opacity, y: part1Y }}
          >
            <h2>Proudly Made in Addis Ababa</h2>
            <p>
              Nyala Shoe &amp; Leather Products Factory is a leather maker based in Addis Ababa, Ethiopia. We are named after the nyala, the graceful antelope of the Ethiopian highlands. Like it, our products are strong, steady and made for the road ahead. Every day, our team turns carefully chosen leather into shoes, boots, safety shoes, bags, belts and wallets.
            </p>
          </motion.div>

          <motion.div
            aria-hidden={!reducedMotion && activeCopy !== 'part2'}
            className="about-copy-block about-story-part about-story-part2"
            inert={!reducedMotion && activeCopy !== 'part2'}
            style={reducedMotion ? undefined : { opacity: part2Opacity, y: part2Y }}
          >
            <h2>Quality That Lasts</h2>
            <p>
              We believe a good leather product should last for years. That is why we cut, stitch and finish every piece with care. We make shoes for work, school and everyday life, and leather goods for people who value quality. Our goal is simple: products you can trust, at fair prices, made right here at home.
            </p>
            <motion.div
              aria-hidden={!reducedMotion && !part2ButtonsVisible}
              className="about-story-actions"
              inert={!reducedMotion && !part2ButtonsVisible}
              style={reducedMotion ? undefined : { opacity: part2ButtonsOpacity, y: part2ButtonsY }}
            >
              <Link className="about-story-button about-story-button-primary" href="/products">Our Products</Link>
              <Link className="about-story-button about-story-button-outline" href="/contact">Contact Us</Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
