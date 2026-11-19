'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const reasons = [
  'Strong leather, picked with care.',
  'Made by skilled hands, from cut to finish.',
  'Strong stitching that lasts every day.',
  'Shoes for work, school and every day.',
  'Proudly made in Addis Ababa.',
]

function ReasonRow({ index, progress, reduceMotion }: { index: number; progress: ReturnType<typeof useScroll>['scrollYProgress']; reduceMotion: boolean }) {
  const start = 0.12 + index * 0.16
  const opacity = useTransform(progress, [start, start + 0.09], [0, 1])
  const y = useTransform(progress, [start, start + 0.09], [48, 0])

  return (
    <motion.li className="reason-row" style={reduceMotion ? undefined : { opacity, y }}>
      <span className="reason-number">{String(index + 1).padStart(2, '0')}</span>
      <span className="reason-copy">{reasons[index]}</span>
    </motion.li>
  )
}

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const titleY = useTransform(scrollYProgress, [0, 0.12], [64, 0])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1])

  return (
    <section className="why-section" ref={sectionRef} aria-labelledby="why-title">
      <div className="why-sticky">
        <motion.h2 id="why-title" className="why-title" style={reduceMotion ? undefined : { y: titleY, opacity: titleOpacity }}>
          Why Choose Us
        </motion.h2>
        <ol className="why-reasons">
          {reasons.map((_, index) => (
            <ReasonRow key={index} index={index} progress={scrollYProgress} reduceMotion={reduceMotion === true} />
          ))}
        </ol>
      </div>
    </section>
  )
}
