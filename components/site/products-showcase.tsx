'use client'

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useRef, useState } from 'react'
import { products } from '@/data/products'
import { UnsplashImage } from '@/components/site/unsplash-image'

const phoneLink = 'tel:+251911606155'

function CallButton({ label = 'Call to order' }: { label?: string }) {
  return (
    <a className="products-call-button" href={phoneLink}>
      {label}
    </a>
  )
}

function ProductCard({ product, index }: { product: (typeof products)[number]; index: number }) {
  const reducedMotion = useReducedMotion() === true

  return (
    <motion.article
      className="products-mobile-card"
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.15 }}
    >
      <UnsplashImage
        alt={product.alt}
        className="products-mobile-image"
        fill
        loading="lazy"
        sizes="(max-width: 767px) calc(100vw - 40px), 1px"
        src={product.image}
      />
      <div aria-hidden="true" className="products-card-shade" />
      <div className="products-mobile-copy">
        <span className="products-tag">{product.tag}</span>
        <h2>{product.name}</h2>
        <p>{product.line}</p>
        <CallButton />
      </div>
      <span className="sr-only">Product {index + 1} of {products.length}</span>
    </motion.article>
  )
}

export function ProductsShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)
  const reducedMotion = useReducedMotion() === true
  const lenis = useLenis()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (reducedMotion || window.matchMedia('(max-width: 767px)').matches) return
    const nextIndex = Math.min(products.length - 1, Math.floor(progress * products.length))
    if (nextIndex === activeIndexRef.current) return
    const outgoingIndex = activeIndexRef.current
    setPreviousIndex(outgoingIndex)
    activeIndexRef.current = nextIndex
    setActiveIndex(nextIndex)
    window.setTimeout(() => setPreviousIndex((current) => current === outgoingIndex ? null : current), 500)
  })

  const scrollToProduct = (index: number) => {
    const section = sectionRef.current
    if (!section) return
    const progress = (index + 0.08) / products.length
    const target = section.getBoundingClientRect().top + window.scrollY + progress * (section.offsetHeight - window.innerHeight)
    if (reducedMotion) {
      window.scrollTo({ top: target, behavior: 'auto' })
    } else if (lenis) {
      lenis.scrollTo(target, { duration: 1.15 })
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' })
    }
  }

  const visibleImages = [...new Set([previousIndex, activeIndex].filter((index): index is number => index !== null))]

  return (
    <>
      <section className="products-showcase" ref={sectionRef} aria-label="Explore our products">
        <div className="products-pin">
          <nav aria-label="Choose a product" className="products-name-list">
            {products.map((product, index) => (
              <button
                aria-pressed={activeIndex === index}
                className={`products-name-button${activeIndex === index ? ' is-active' : ''}`}
                key={product.name}
                onClick={() => scrollToProduct(index)}
                type="button"
              >
                {product.name}
              </button>
            ))}
          </nav>
          <div className="products-photo-stage">
            {visibleImages.map((index) => {
              const product = products[index]
              const isActive = index === activeIndex
              return (
                <div
                  aria-hidden={!isActive}
                  className={`products-photo-layer${isActive ? ' is-active' : ''}`}
                  key={product.name}
                >
                  <UnsplashImage
                    alt={product.alt}
                    className="products-photo"
                    fill
                    loading="lazy"
                    sizes="(max-width: 767px) 1px, 60vw"
                    src={product.image}
                  />
                  <div aria-hidden="true" className="products-photo-shade" />
                  {isActive && (
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      className="products-photo-copy"
                      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                      key={product.name}
                      transition={{ duration: reducedMotion ? 0 : 0.45, ease: 'easeOut' }}
                    >
                      <span className="products-tag">{product.tag}</span>
                      <h2>{product.name}</h2>
                      <p>{product.line}</p>
                      <CallButton />
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section aria-label="All products" className="products-mobile-list">
        {products.map((product, index) => <ProductCard index={index} key={product.name} product={product} />)}
      </section>
    </>
  )
}
