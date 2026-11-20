export const unsplashUrl = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&q=70&w=1600`

export const heroImage = { src: '/nyala-workshop.png', alt: '' }

export const galleryImages = [
  { keyword: 'leather stitching close-up', src: unsplashUrl('photo-1520639888713-7851133b1ed0'), alt: 'Brown leather boots with visible stitching' },
  { keyword: 'shoe factory', src: unsplashUrl('photo-1495555961986-6d4c1ecb7be3'), alt: 'Leather shoes in contrasting finishes' },
  { keyword: 'leather belts', src: unsplashUrl('photo-1590874103328-eac38a683ce7'), alt: 'Crafted leather accessories' },
  { keyword: 'leather wallets', src: unsplashUrl('photo-1627123424574-724758594e93'), alt: 'Leather wallet with stitched edges' },
  { keyword: 'leather workshop', src: heroImage.src, alt: 'Artisan stitching a leather shoe' },
  { keyword: 'leather goods', src: unsplashUrl('photo-1553062407-98eeb64c6a62'), alt: 'Leather bag with crafted details' },
] as const
