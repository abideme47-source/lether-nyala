import { AboutNavigation } from '@/components/site/about-navigation'
import { Footer } from '@/components/site/footer'
import { MobileCallBar } from '@/components/site/mobile-call-bar'
import { ProductsIntro } from '@/components/site/products-intro'
import { ProductsShowcase } from '@/components/site/products-showcase'
import { pageMetadata } from '@/lib/page-metadata'

export const metadata = pageMetadata(
  'Products | Nyala Leather Shoes, Boots, Bags & Belts',
  'Leather shoes, boots, safety shoes, bags, belts and wallets from Nyala in Addis Ababa. Call to order.',
)

export default function ProductsPage() {
  return (
    <div className="products-page">
      <AboutNavigation />
      <main className="products-main">
        <ProductsIntro />
        <ProductsShowcase />
        <section aria-labelledby="products-closing-title" className="products-closing">
          <h2 id="products-closing-title">Cannot find what you need? Call us.</h2>
          <a className="products-call-button" href="tel:+251911606155">Call Now</a>
        </section>
      </main>
      <MobileCallBar />
      <Footer />
      <div aria-hidden="true" className="footer-reveal-spacer" />
    </div>
  )
}
