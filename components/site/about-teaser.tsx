'use client'

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { heroImage } from '@/lib/site-images'
import { useImagePreload } from '@/lib/use-image-preload'

const headlineLines = ['A factory with', 'leather in its heart']

function HeadlineLine({ index, progress, reducedMotion }: {
  index: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  reducedMotion: boolean
}) {
  const start = 0.36 + index * 0.095
  const y = useTransform(progress, [start, start + 0.095], ['100%', '0%'])

  return (
    <span className="about-teaser-headline-mask">
      <motion.span aria-hidden="true" style={reducedMotion ? undefined : { y }}>
        {headlineLines[index]}
      </motion.span>
    </span>
  )
}

export function AboutTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  useImagePreload(sectionRef, heroImage.src)
  const reducedMotion = useReducedMotion() === true
  const [buttonVisible, setButtonVisible] = useState(false)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end end'] })
  const photoRevealOpacity = useTransform(scrollYProgress, [0, 0.28], [0, 1])
  const photoScale = useTransform(scrollYProgress, [0, 0.28], [1.15, 1])
  const labelOpacity = useTransform(scrollYProgress, [0.28, 0.36], [0, 1])
  const ruleScale = useTransform(scrollYProgress, [0.28, 0.36, 0.88], [0.1875, 0.1875, 1])
  const paragraphOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1])
  const paragraphY = useTransform(scrollYProgress, [0.55, 0.75], [12, 0])
  const buttonOpacity = useTransform(scrollYProgress, [0.75, 0.88], [0, 1])
  const buttonY = useTransform(scrollYProgress, [0.75, 0.88], [12, 0])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    setButtonVisible(progress >= 0.88)
  })

  const buttonIsAccessible = reducedMotion || buttonVisible

  return (
    <section
      aria-labelledby="about-teaser-title"
      className={`about-teaser${reducedMotion ? ' about-teaser-static' : ''}`}
      id="about-teaser"
      ref={sectionRef}
    >
      <motion.div className="about-teaser-sticky">
        <div className="about-teaser-inner">
          <motion.div
            className="about-teaser-photo-frame"
            style={reducedMotion ? undefined : { opacity: photoRevealOpacity }}
          >
            <motion.div className="about-teaser-photo-image" style={reducedMotion ? undefined : { scale: photoScale }}>
              <Image
                alt="Leather craftsman hand-stitching a shoe in a workshop"
                fill
                loading="lazy"
                decoding="async"
                sizes="(max-width: 767px) calc(100vw - 40px), 450px"
                src={heroImage.src}
              />
            </motion.div>
          </motion.div>

          <div className="about-teaser-copy">
            <div className="about-teaser-label-row">
              <motion.p className="about-teaser-label" style={reducedMotion ? undefined : { opacity: labelOpacity }}>
                About us
              </motion.p>
              <motion.span
                aria-hidden="true"
                className="about-teaser-rule"
                style={reducedMotion ? undefined : { scaleX: ruleScale }}
              />
            </div>
            <h2 aria-label="A factory with leather in its heart" id="about-teaser-title">
              {headlineLines.map((_, index) => (
                <HeadlineLine index={index} key={index} progress={scrollYProgress} reducedMotion={reducedMotion} />
              ))}
            </h2>
            <motion.p
              className="about-teaser-description"
              style={reducedMotion ? undefined : { opacity: paragraphOpacity, y: paragraphY }}
            >
              We are a team of makers in Addis Ababa. We choose the leather, cut it, stitch it and finish it ourselves. From school shoes to safety boots, we make products for the people of Ethiopia who work, learn and move every day.
            </motion.p>
            <motion.div
              aria-hidden={!buttonIsAccessible}
              className="about-teaser-action"
              inert={!buttonIsAccessible}
              style={reducedMotion ? undefined : { opacity: buttonOpacity, y: buttonY }}
            >
              <Link className="about-teaser-button" href="/about">
                <span>See About Us</span>
                <ArrowRight aria-hidden="true" className="about-teaser-arrow" size={18} strokeWidth={1.8} />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
