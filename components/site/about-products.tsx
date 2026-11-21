'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import { products } from '@/data/products'
import { useImagePreload } from '@/lib/use-image-preload'

export function AboutProducts() {
  const sectionRef = useRef<HTMLElement>(null)
  useImagePreload(sectionRef, products[0].images[0].src)
  const reducedMotion = useReducedMotion() === true

  return (
    <section aria-labelledby="about-products-title" className="about-products" ref={sectionRef}>
      <div className="about-products-inner">
        <h2 id="about-products-title">What we make</h2>
        <div className="about-products-grid">
          {products.map(({ name, images }, index) => (
            <motion.div
              className="about-product-shell"
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              key={name}
              transition={{ delay: reducedMotion ? 0 : index * 0.08, duration: reducedMotion ? 0 : 0.55, ease: 'easeOut' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link className="about-product-card" href="/products">
                <Image
                  alt={images[0].alt}
                  className="about-product-image"
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 767px) 50vw, 34vw"
                  src={images[0].src}
                />
                <span aria-hidden="true" className="about-product-shade" />
                <span className="about-product-name">{name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
