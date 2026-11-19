const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1920&q=80`

export const products = [
  { name: 'Shoes', image: unsplash('photo-1614252235316-8c857d38b5f4'), alt: 'Leather shoes' },
  { name: 'Bags', image: unsplash('photo-1553062407-98eeb64c6a62'), alt: 'Leather bag' },
  { name: 'Boots', image: unsplash('photo-1608256246200-53e635b5b65f'), alt: 'Leather boots' },
  { name: 'Belts', image: unsplash('photo-1590874103328-eac38a683ce7'), alt: 'Leather belt' },
  { name: 'Wallets', image: unsplash('photo-1627123424574-724758594e93'), alt: 'Leather wallet' },
  { name: 'Safety Shoes', image: unsplash('photo-1598033129183-c4f50c736f10'), alt: 'Safety work boots' },
] as const
