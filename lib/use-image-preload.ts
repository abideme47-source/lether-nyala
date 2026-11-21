'use client'

import { useEffect, type RefObject } from 'react'

export function useImagePreload(target: RefObject<HTMLElement | null>, src: string) {
  useEffect(() => {
    const element = target.current
    if (!element) return

    const preload = () => {
      const image = new window.Image()
      image.decoding = 'async'
      image.src = src
    }

    if (!('IntersectionObserver' in window)) {
      preload()
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      preload()
      observer.disconnect()
    }, { rootMargin: '150% 0px' })

    observer.observe(element)
    return () => observer.disconnect()
  }, [src, target])
}
