'use client'

import { useEffect } from 'react'

export default function ScrollObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const delay = parseInt(el.dataset.animateDelay ?? '0', 10)
          setTimeout(() => el.classList.add('in-view'), delay)
          observer.unobserve(el)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
