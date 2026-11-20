import Image, { type ImageProps } from 'next/image'

const urlForWidth = (src: string, width: number) => {
  const url = new URL(src)
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'crop')
  url.searchParams.set('q', '70')
  url.searchParams.set('w', String(width))
  return url.toString()
}

type UnsplashImageProps = Omit<ImageProps, 'src'> & { src: string }

export function UnsplashImage({ src, sizes = '100vw', ...props }: UnsplashImageProps) {
  const mobileSource = `${urlForWidth(src, 800)} 800w`
  const desktopSource = `${urlForWidth(src, 800)} 800w, ${urlForWidth(src, 1600)} 1600w`

  return (
    <picture>
      <source media="(max-width: 767px)" sizes={sizes} srcSet={mobileSource} />
      <source media="(min-width: 768px)" sizes={sizes} srcSet={desktopSource} />
      <Image {...props} src={src} sizes={sizes} />
    </picture>
  )
}
