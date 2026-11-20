'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function ProductsIntro() {
  const reducedMotion = useReducedMotion() === true

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className="products-intro"
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      transition={{ duration: reducedMotion ? 0 : 0.65, ease: 'easeOut' }}
    >
      <p className="products-eyebrow">Products</p>
      <h1>Our Products</h1>
      <p className="products-intro-line">Leather made in Addis Ababa. Call to order.</p>
    </motion.header>
  )
}
