import dynamic from 'next/dynamic'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/site/hero'
import { MarqueeStrip } from '@/components/site/marquee-strip'
import { MobileCallBar } from '@/components/site/mobile-call-bar'
import { pageMetadata } from '@/lib/page-metadata'

const ProductMosaic = dynamic(() => import('@/components/site/product-mosaic').then((module) => module.ProductMosaic))
const AboutTeaser = dynamic(() => import('@/components/site/about-teaser').then((module) => module.AboutTeaser))
const WhyChooseUs = dynamic(() => import('@/components/site/why-choose-us').then((module) => module.WhyChooseUs))
const Gallery = dynamic(() => import('@/components/site/gallery').then((module) => module.Gallery))
const FinalCta = dynamic(() => import('@/components/site/final-cta').then((module) => module.FinalCta))
const HomeSectionDots = dynamic(() => import('@/components/site/scroll-indicators').then((module) => module.HomeSectionDots))

export const metadata = pageMetadata(
  'Nyala | Leather Shoes, Boots, Bags & Belts in Addis Ababa',
  'Nyala Shoe & Leather Products Factory in Addis Ababa makes shoes, boots, safety shoes, bags, belts and wallets. Call us to order.',
)

export default function HomePage() {
  return (
    <>
      <main className="home-main">
        <Hero />
        <MarqueeStrip />
        <ProductMosaic />
        <AboutTeaser />
        <WhyChooseUs />
        <Gallery />
        <FinalCta />
      </main>
      <MobileCallBar />
      <Footer />
      <div className="footer-reveal-spacer" aria-hidden="true" />
      <HomeSectionDots />
    </>
  )
}
