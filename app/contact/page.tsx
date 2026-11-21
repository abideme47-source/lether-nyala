import { ContactPageContent } from '@/app/contact/contact-page-content'
import { pageMetadata } from '@/lib/page-metadata'

export const metadata = pageMetadata(
  'Contact | Nyala Shoe & Leather Products Factory, Addis Ababa',
  'Call Nyala Shoe & Leather Products Factory in Addis Ababa to order shoes, boots, bags, belts and wallets.',
)

export default function ContactPage() {
  return <ContactPageContent />
}
