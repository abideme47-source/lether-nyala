import type { Metadata } from 'next'
import { AboutNavigation } from '@/components/site/about-navigation'
import { AboutStory } from '@/components/site/about-story'
import { Footer } from '@/components/site/footer'
import { MobileCallBar } from '@/components/site/mobile-call-bar'

export const metadata: Metadata = {
  title: 'About Nyala | Nyala Shoe & Leather Products Factory',
  description: 'Learn about Nyala Shoe & Leather Products Factory, proudly making quality leather products in Addis Ababa, Ethiopia.',
}

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
