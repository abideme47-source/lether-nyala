import { unsplashUrl } from '@/lib/site-images'

export const products = [
  { name: 'Shoes', tag: 'Footwear', line: 'Strong leather shoes for every day.', image: unsplashUrl('photo-1614252235316-8c857d38b5f4'), alt: 'Leather shoes' },
  { name: 'Bags', tag: 'Leather goods', line: 'Leather bags made to carry your day.', image: unsplashUrl('photo-1553062407-98eeb64c6a62'), alt: 'Leather bag' },
  { name: 'Boots', tag: 'Footwear', line: 'Tough leather boots for any road.', image: unsplashUrl('photo-1608256246200-53e635b5b65f'), alt: 'Leather boots' },
  { name: 'Belts', tag: 'Leather goods', line: 'Classic leather belts with strong stitching.', image: unsplashUrl('photo-1590874103328-eac38a683ce7'), alt: 'Leather belt' },
  { name: 'Wallets', tag: 'Leather goods', line: 'Slim leather wallets that last.', image: unsplashUrl('photo-1627123424574-724758594e93'), alt: 'Leather wallet' },
  { name: 'Safety Shoes', tag: 'Footwear', line: 'Strong shoes for work and the job site.', image: unsplashUrl('photo-1598033129183-c4f50c736f10'), alt: 'Safety work boots' },
] as const
