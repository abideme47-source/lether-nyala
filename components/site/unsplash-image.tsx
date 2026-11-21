import Image, { type ImageProps } from 'next/image'
import { unsplashLoader, unsplashUrl } from '@/lib/img'

type UnsplashImageProps = Omit<ImageProps, 'src' | 'loader'> & { src: string; maxWidth?: 640 | 800 | 1280 | 1600 }

export function UnsplashImage({ src, sizes = '100vw', quality = 60, maxWidth, ...props }: UnsplashImageProps) {
  const photoId = src.replace(/^https:\/\/images\.unsplash\.com\//, '')
  const imageQuality = Number(quality)
  const mobileWidth = maxWidth && maxWidth < 800 ? maxWidth : 800
  const mobileSource = `${unsplashUrl(photoId, mobileWidth, imageQuality)} ${mobileWidth}w`
  const desktopWidths = maxWidth && maxWidth <= 640 ? [maxWidth] : [1280, 1600]
  const desktopSource = desktopWidths.map((width) => `${unsplashUrl(photoId, width, imageQuality)} ${width}w`).join(', ')
  const blurDataURL = unsplashUrl(photoId, 24, 40)

  return (
    <picture>
      <source media="(max-width: 767px)" sizes={sizes} srcSet={mobileSource} />
      <source media="(min-width: 768px)" sizes={sizes} srcSet={desktopSource} />
      <Image
        {...props}
        blurDataURL={blurDataURL}
        decoding="async"
        loader={unsplashLoader}
        placeholder="blur"
        quality={quality}
        sizes={sizes}
        src={src}
        unoptimized
      />
    </picture>
  )
}
