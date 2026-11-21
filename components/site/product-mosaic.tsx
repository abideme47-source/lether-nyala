'use client'

import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import { products } from '@/data/products'
import { useImagePreload } from '@/lib/use-image-preload'

function ProductPanel({ title, index, reduceMotion }: { title: string; index: number; reduceMotion: boolean }) {

  return (
    <figure className={`product-panel product-panel-${index + 1}`} style={{ zIndex: index + 1 }}>
      <div className="panel-media">
        <Image className="panel-image" src={products[index].images[0].src} alt={products[index].images[0].alt} fill sizes="100vw" loading="lazy" decoding="async" />
      </div>
      <div className="panel-shade" aria-hidden="true" />
      <motion.figcaption
        className="product-caption"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.25 }}
      >
        <span className="product-count">{String(index + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}</span>
        <h3>{title}</h3>
        <Link className="product-view" href={`/products?p=${products[index].slug}`}>View</Link>
      </motion.figcaption>
    </figure>
  )
}

export function ProductMosaic() {
  const sectionRef = useRef<HTMLElement>(null)
  useImagePreload(sectionRef, products[0].images[0].src)
  const reduceMotion = useReducedMotion()
  const isInView = useInView(sectionRef, { amount: 0.08 })

  return (
    <section className="products-section" ref={sectionRef} aria-labelledby="products-title" id="products">
      <h2 className={`products-sticky-title${isInView ? ' is-visible' : ''}`} id="products-title">Our Products</h2>
      <div className="product-panels">
        {products.map(({ name }, index) => (
          <ProductPanel key={name} title={name} index={index} reduceMotion={reduceMotion === true} />
        ))}
      </div>
    </section>
  )
}
