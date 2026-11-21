import { Suspense } from 'react'
import { ProductsPageContent } from '@/components/site/products-page-content'
import { pageMetadata } from '@/lib/page-metadata'

export const metadata = pageMetadata(
  'Products | Nyala Leather Shoes, Boots, Bags & Belts',
  'Leather shoes, boots, safety shoes, bags, belts and wallets from Nyala in Addis Ababa. Call to order.',
)

export default function ProductsPage() {
  return (
    <Suspense fallback={<div aria-hidden="true" className="products-page" style={{ minHeight: '100dvh' }} />}>
      <ProductsPageContent />
    </Suspense>
  )
}
