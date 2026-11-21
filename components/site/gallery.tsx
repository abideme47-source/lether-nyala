'use client'

import { useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { galleryImages } from '@/lib/site-images'
import { UnsplashImage } from '@/components/site/unsplash-image'
import { useImagePreload } from '@/lib/use-image-preload'

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  useImagePreload(sectionRef, galleryImages[0].src)
  const isInView = useInView(sectionRef, { amount: 0.08 })

  return (
    <section className="gallery-section" ref={sectionRef} aria-labelledby="gallery-title" id="gallery">
      <h2 className={`gallery-sticky-title${isInView ? ' is-visible' : ''}`} id="gallery-title">Our Gallery</h2>
      <div className="gallery-panels">
        {galleryImages.map((image, index) => (
          <figure className={`gallery-panel gallery-panel-${index + 1}`} key={image.src} style={{ zIndex: index + 1 }}>
            <div className="panel-media">
              {isInView && (image.src.startsWith('https://images.unsplash.com/') ? (
                <UnsplashImage className="panel-image" src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 100vw, 50vw" loading="lazy" decoding="async" maxWidth={640} />
              ) : (
                <Image className="panel-image" src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 100vw, 50vw" loading="lazy" decoding="async" />
              ))}
            </div>
          </figure>
        ))}
      </div>
    </section>
  )
}
