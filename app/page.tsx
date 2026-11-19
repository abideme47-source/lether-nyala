import { Footer } from '@/components/site/footer'
import { FinalCta } from '@/components/site/final-cta'
import { Gallery } from '@/components/site/gallery'
import { Hero } from '@/components/site/hero'
import { MarqueeStrip } from '@/components/site/marquee-strip'
import { MobileCallBar } from '@/components/site/mobile-call-bar'
import { ProductMosaic } from '@/components/site/product-mosaic'
import { WhyChooseUs } from '@/components/site/why-choose-us'

export default function HomePage() {
  return (
    <>
      <main className="home-main">
        <Hero />
        <MarqueeStrip />
        <ProductMosaic />
        <WhyChooseUs />
        <Gallery />
        <FinalCta />
      </main>
      <MobileCallBar />
      <Footer />
      <div className="footer-reveal-spacer" aria-hidden="true" />
    </>
  )
}
