'use client'

import { useCallback, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AboutNavigation } from '@/components/site/about-navigation'
import { Footer } from '@/components/site/footer'
import { MobileCallBar } from '@/components/site/mobile-call-bar'
import { ProductsContact, ProductsShowcase } from '@/components/site/products-showcase'
import { products } from '@/data/products'

export function ProductsPageContent() {
  const searchParams = useSearchParams()
  const requestedSlug = searchParams.get('p')
  const requestedIndex = products.findIndex((product) => product.slug === requestedSlug)
  const [ready, setReady] = useState(requestedIndex < 0)
  const revealPage = useCallback(() => setReady(true), [])

  return (
    <div
      className="products-page"
      style={{ opacity: ready ? 1 : 0, pointerEvents: ready ? 'auto' : 'none', transition: 'opacity 200ms ease' }}
    >
      <AboutNavigation />
      <main className="products-main">
        <ProductsShowcase initialIndex={requestedIndex >= 0 ? requestedIndex : 0} onJumpComplete={requestedIndex >= 0 ? revealPage : undefined} />
        <ProductsContact />
      </main>
      <MobileCallBar />
      <Footer />
      <div aria-hidden="true" className="footer-reveal-spacer" />
    </div>
  )
}
