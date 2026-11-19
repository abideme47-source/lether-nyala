const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1920&q=80`

export const heroImage = { src: '/nyala-workshop.png', alt: '' }

export const productImages = [
  { keyword: 'leather shoes', src: unsplash('photo-1614252235316-8c857d38b5f4'), alt: 'Brown leather dress shoes' },
  { keyword: 'leather boots', src: unsplash('photo-1608256246200-53e635b5b65f'), alt: 'Leather boots on display' },
  { keyword: 'sandals', src: unsplash('photo-1603487742131-4160ec999306'), alt: 'Leather sandals in warm light' },
  { keyword: 'safety work boots', src: unsplash('photo-1598033129183-c4f50c736f10'), alt: 'Durable work boots' },
  { keyword: 'school shoes', src: unsplash('photo-1514989940723-e8e51635b782'), alt: 'Classic school shoes' },
  { keyword: 'leather bags', src: unsplash('photo-1553062407-98eeb64c6a62'), alt: 'Leather bag with crafted details' },
] as const

export const galleryImages = [
  { keyword: 'leather stitching close-up', src: unsplash('photo-1520639888713-7851133b1ed0'), alt: 'Brown leather boots with visible stitching' },
  { keyword: 'shoe factory', src: unsplash('photo-1495555961986-6d4c1ecb7be3'), alt: 'Leather shoes in contrasting finishes' },
  { keyword: 'leather belts', src: unsplash('photo-1590874103328-eac38a683ce7'), alt: 'Crafted leather accessories' },
  { keyword: 'leather wallets', src: unsplash('photo-1627123424574-724758594e93'), alt: 'Leather wallet with stitched edges' },
  { keyword: 'leather workshop', src: heroImage.src, alt: 'Artisan stitching a leather shoe' },
  { keyword: 'leather goods', src: unsplash('photo-1553062407-98eeb64c6a62'), alt: 'Leather bag with crafted details' },
] as const
