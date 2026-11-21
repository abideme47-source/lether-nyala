'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { useEffect, useRef, useState, type TouchEvent } from 'react'
import { products } from '@/data/products'

type Product = (typeof products)[number]

function ProductPanel({
  product,
  index,
  activeIndex,
  photoIndex,
  progress,
  reducedMotion,
}: {
  product: Product
  index: number
  activeIndex: number
  photoIndex: number
  progress: MotionValue<number>
  reducedMotion: boolean
}) {
  const segmentStart = index / products.length
  const segmentEnd = (index + 1) / products.length
  const liftStart = segmentStart + (segmentEnd - segmentStart) * 0.65
  const isActive = index === activeIndex
  const isNext = index === activeIndex + 1
  const isMounted = isActive || isNext || (activeIndex === 0 && index < 2)
  const y = useTransform(progress, [liftStart, segmentEnd], ['0%', '-100%'])
  const photoScaleStart = segmentStart === 0 ? segmentEnd * 0.35 : segmentStart - (1 / products.length) * 0.35
  const photoScale = useTransform(progress, [photoScaleStart, segmentStart === 0 ? photoScaleStart + 0.01 : segmentStart], [1.08, 1])
  const panelProgress = useTransform(
    progress,
    index === products.length - 1 ? [segmentStart, 1] : [0, 1],
    index === products.length - 1 ? [segmentStart, segmentStart + 0.6 / products.length] : [0, 1],
  )
  const descriptionOpacity = useTransform(panelProgress, [segmentStart + 0.1 / products.length, segmentStart + 0.4 / products.length], [0, 1])
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const [descriptionHeight, setDescriptionHeight] = useState(0)
  const copyY = useTransform(panelProgress, [segmentStart + 0.1 / products.length, segmentStart + 0.4 / products.length], [descriptionHeight, 0])

  useEffect(() => {
    const element = descriptionRef.current
    if (!element) return
    const observer = new ResizeObserver(() => {
      const style = window.getComputedStyle(element)
      const margins = Number.parseFloat(style.marginTop) + Number.parseFloat(style.marginBottom)
      setDescriptionHeight(element.getBoundingClientRect().height + margins)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.article
      aria-hidden={!isActive}
      className={`products-panel${isActive ? ' is-active' : ''}`}
      inert={!isActive}
      style={reducedMotion ? undefined : { y: index === products.length - 1 ? 0 : y, zIndex: products.length - index }}
    >
      <div className="products-panel-image-wrap">
        {isMounted && (
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 1 }}
              className="products-panel-image-layer"
              exit={{ opacity: 0, scale: 1.02 }}
              initial={{ opacity: 0, scale: 1.04 }}
              key={product.images[photoIndex].src}
              style={isActive ? undefined : { scale: photoScale }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Image
                alt={product.images[photoIndex].alt}
                className="products-panel-image"
                fill
                priority={isActive}
                loading={isActive ? 'eager' : 'lazy'}
                decoding="async"
                sizes="100vw"
                src={product.images[photoIndex].src}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <div aria-hidden="true" className="products-panel-shade" />
      <div className="products-photo-gradient" />
      <motion.div className="products-panel-copy" style={reducedMotion ? undefined : { y: copyY }}>
        <motion.h2>{product.name}</motion.h2>
        <motion.p ref={descriptionRef} style={reducedMotion ? undefined : { opacity: descriptionOpacity }}>{product.line}</motion.p>
      </motion.div>
    </motion.article>
  )
}

export function ProductsShowcase({ initialIndex = 0, onJumpComplete }: { initialIndex?: number; onJumpComplete?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const activeRef = useRef(initialIndex)
  const preloadedUpcoming = useRef(new Set<string>())
  const touchStartX = useRef<number | null>(null)
  const pressedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [photoIndexes, setPhotoIndexes] = useState<number[]>(products.map(() => 0))
  const [pressed, setPressed] = useState(false)
  const reducedMotion = useReducedMotion() === true
  const lenis = useLenis()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  useEffect(() => {
    for (const image of products[activeIndex].images.slice(1)) {
      const preload = new window.Image()
      preload.src = image.src
    }
  }, [activeIndex])

  useEffect(() => {
    if (!onJumpComplete) return
    if (!lenis && !reducedMotion) return
    let secondFrame = 0
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const section = sectionRef.current
        if (!section) return
        const progress = (initialIndex + 0.12) / products.length
        const target = section.getBoundingClientRect().top + window.scrollY + progress * (section.offsetHeight - window.innerHeight)
        if (lenis) lenis.scrollTo(target, { immediate: true })
        else window.scrollTo({ top: target, behavior: 'instant' })
        onJumpComplete()
      })
    })
    return () => {
      window.cancelAnimationFrame(firstFrame)
      if (secondFrame) window.cancelAnimationFrame(secondFrame)
    }
  }, [initialIndex, lenis, onJumpComplete, reducedMotion])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (reducedMotion) return
    const nextIndex = Math.min(products.length - 1, Math.floor(progress * products.length))
    if (nextIndex !== activeRef.current) {
      activeRef.current = nextIndex
      setActiveIndex(nextIndex)
    }

    const activeProgress = progress * products.length - activeRef.current
    const upcoming = products[activeRef.current + 1]
    const upcomingImage = upcoming?.images[0]
    if (activeProgress >= 0.4 && upcomingImage && !preloadedUpcoming.current.has(upcomingImage.src)) {
      preloadedUpcoming.current.add(upcomingImage.src)
      const preload = new window.Image()
      preload.src = upcomingImage.src
    }
  })

  const scrollToProduct = (index: number) => {
    const section = sectionRef.current
    if (!section) return
    const progress = (index + 0.12) / products.length
    const target = section.getBoundingClientRect().top + window.scrollY + progress * (section.offsetHeight - window.innerHeight)
    if (reducedMotion) window.scrollTo({ top: target, behavior: 'auto' })
    else if (lenis) lenis.scrollTo(target, { duration: 1.15 })
    else window.scrollTo({ top: target, behavior: 'smooth' })
  }

  const advancePhoto = (index = activeIndex) => {
    setPhotoIndexes((current) => current.map((photoIndex, productIndex) =>
      productIndex === index ? (photoIndex + 1) % products[index].images.length : photoIndex,
    ))
    setPressed(true)
    if (pressedTimer.current) clearTimeout(pressedTimer.current)
    pressedTimer.current = setTimeout(() => setPressed(false), 220)
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartX.current
    const end = event.changedTouches[0]?.clientX
    if (start !== null && end !== undefined && Math.abs(end - start) > 42) advancePhoto()
    touchStartX.current = null
  }

  return (
    <>
      <section
        aria-label="Explore our products"
        className={`products-showcase${reducedMotion ? ' is-reduced-motion' : ''}`}
        ref={sectionRef}
      >
        <div className="products-pin">
          <nav aria-label="Choose a product" className="products-name-list">
            {products.map((product, index) => (
              <button
                aria-current={activeIndex === index ? 'step' : undefined}
                className={`products-name-button${activeIndex === index ? ' is-active' : ''}`}
                key={product.name}
                onClick={() => scrollToProduct(index)}
                type="button"
              >
                {product.name}
              </button>
            ))}
          </nav>
          <div
            aria-label={`Product photo: ${products[activeIndex].name}`}
            className="products-photo-stage"
            role="group"
            onTouchEnd={handleTouchEnd}
            onTouchStart={handleTouchStart}
          >
            <span className="products-photo-count" aria-live="polite">{photoIndexes[activeIndex] + 1}/3</span>
            <span className="products-mobile-counter" aria-live="polite">
              {String(activeIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </span>
            <button
              aria-label={`Show next photo of ${products[activeIndex].name}`}
              className={`products-next-button${pressed ? ' is-pressed' : ''}`}
              onClick={() => advancePhoto()}
              type="button"
            >
              <ArrowRight aria-hidden="true" size={19} strokeWidth={1.5} />
            </button>
            {products.map((product, index) => (
              <ProductPanel
                activeIndex={activeIndex}
                index={index}
                key={product.name}
                photoIndex={photoIndexes[index]}
                product={product}
                progress={scrollYProgress}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>
      </section>
      {reducedMotion && (
        <section className="products-reduced-list" aria-label="All products">
          {products.map((product) => (
            <article className="products-reduced-card" key={product.name}>
              <Image alt={product.images[0].alt} fill loading="lazy" decoding="async" sizes="100vw" src={product.images[0].src} />
              <div className="products-reduced-copy">

                <h2>{product.name}</h2>
                <p>{product.line}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  )
}

export function ProductsContact() {
  const reducedMotion = useReducedMotion() === true

  return (
    <section aria-label="Contact Nyala" className="products-contact">
      <div className="products-contact-content">
        <motion.a
          className="products-contact-button"
          href="/contact"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.55, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Contact Us
        </motion.a>
      </div>
    </section>
  )
}
