import { Phone } from 'lucide-react'
import { contactDetails } from '@/lib/contact'

export function MobileCallBar() {
  return (
    <a className="floating-call-button" href={`tel:${contactDetails.mobile[0]}`} aria-label="Call Nyala">
      <Phone className="call-bar-icon" aria-hidden="true" />
    </a>
  )
}
