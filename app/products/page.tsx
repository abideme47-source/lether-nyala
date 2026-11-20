import { AboutNavigation } from '@/components/site/about-navigation'
import { Footer } from '@/components/site/footer'
import { MobileCallBar } from '@/components/site/mobile-call-bar'
import { ProductsContact, ProductsShowcase } from '@/components/site/products-showcase'
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
        <ProductsShowcase />
        <ProductsContact />
      </main>
      <MobileCallBar />
      <Footer />
      <div aria-hidden="true" className="footer-reveal-spacer" />
    </div>
  )
}
