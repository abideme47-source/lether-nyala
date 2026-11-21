import type { Metadata } from 'next'
import { unsplashUrl } from '@/lib/img'

const shareImage = unsplashUrl('photo-1495555961986-6d4c1ecb7be3', 1200, 60, 630)

export function pageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: 'website',
      siteName: 'Nyala Shoe & Leather Products Factory',
      title,
      description,
      images: [{ url: shareImage, width: 1200, height: 630, alt: 'Leather shoes in a Nyala workshop' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [shareImage],
    },
  }
}
