'use client'

import { useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { galleryImages } from '@/lib/site-images'

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.08 })

  return (
    <section className="gallery-section" ref={sectionRef} aria-labelledby="gallery-title">
      <h2 className={`gallery-sticky-title${isInView ? ' is-visible' : ''}`} id="gallery-title">Our Gallery</h2>
      <div className="gallery-panels">
        {galleryImages.map((image, index) => (
          <figure className={`gallery-panel gallery-panel-${index + 1}`} key={image.src} style={{ zIndex: index + 1 }}>
            <div className="panel-media">
              <Image className="panel-image" src={image.src} alt={image.alt} fill sizes="100vw" />
            </div>
          </figure>
        ))}
      </div>
    </section>
  )
}
