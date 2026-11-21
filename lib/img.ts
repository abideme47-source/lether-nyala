const UNSPLASH_HOST = 'https://images.unsplash.com/'

export function unsplashUrl(photoId: string, width = 640, quality = 60, height?: number) {
  const url = new URL(photoId, UNSPLASH_HOST)
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fm', 'webp')
  url.searchParams.set('fit', 'crop')
  url.searchParams.set('w', String(Math.min(1600, Math.max(1, Math.round(width)))))
  url.searchParams.set('q', String(Math.min(100, Math.max(1, Math.round(quality)))))
  if (height) url.searchParams.set('h', String(Math.round(height)))
  return url.toString()
}

export function unsplashLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const photoId = src.replace(/^https:\/\/images\.unsplash\.com\//, '')
  return unsplashUrl(photoId, width, quality ?? 60)
}
