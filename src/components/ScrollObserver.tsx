'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollObserver() {
  const pathname = usePathname()

  useEffect(() => {
    // Mark JS as ready — CSS uses this class so elements are visible
    // by default if JS never loads (progressive enhancement)
    document.documentElement.classList.add('js-ready')

    // Small delay ensures new page DOM is fully committed before querying
    const raf = requestAnimationFrame(() => {
      const elements = document.querySelectorAll('[data-animate]:not(.in-view)')

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
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
      )

      elements.forEach((el) => observer.observe(el))

      return () => observer.disconnect()
    })

    return () => cancelAnimationFrame(raf)
  }, [pathname]) // re-runs on every page navigation

  return null
}
