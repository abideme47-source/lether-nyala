import dynamic from 'next/dynamic'
import { AboutNavigation } from '@/components/site/about-navigation'
import { Footer } from '@/components/site/footer'
import { MobileCallBar } from '@/components/site/mobile-call-bar'
import { pageMetadata } from '@/lib/page-metadata'

const AboutStory = dynamic(() => import('@/components/site/about-story').then((module) => module.AboutStory))

export const metadata = pageMetadata(
  'About Us | Nyala Shoe & Leather Products Factory',
  'Meet Nyala, a leather factory in Addis Ababa making shoes, boots, bags, belts and wallets.',
)

export default function AboutPage() {
  return (
    <div className="about-page">
      <AboutNavigation />
      <main className="about-main">
        <AboutStory />
      </main>
      <MobileCallBar />
      <Footer />
      <div aria-hidden="true" className="footer-reveal-spacer" />
    </div>
  )
}
