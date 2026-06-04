'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

export interface CarouselSlide {
  href: string
  category: string
  title: string
  date: string
  imageUrl?: string
}

export default function HeroCarousel({ slides }: { slides: CarouselSlide[] }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (paused || slides.length <= 1) return
    const id = setInterval(advance, 5000)
    return () => clearInterval(id)
  }, [paused, advance, slides.length])

  return (
    <section
      className="relative min-h-[580px] overflow-hidden bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            pointerEvents: i === current ? 'auto' : 'none',
          }}
        >
          {/* Cover image */}
          {slide.imageUrl && (
            <Image
              src={slide.imageUrl}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Slide content — pinned to bottom-left */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[580px] flex flex-col justify-end pb-20">
            <span className="inline-block bg-bka-red text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 mb-5 w-fit">
              {slide.category}
            </span>

            <h2 className="font-display font-extrabold italic uppercase text-white leading-[0.9] text-[clamp(2.5rem,6vw,5.5rem)] max-w-4xl mb-4">
              {slide.title}
            </h2>

            <div className="text-white/60 text-sm mb-6 uppercase tracking-wider">
              {slide.date}
            </div>

            <a
              href={slide.href}
              className="bg-bka-red text-white font-semibold uppercase tracking-wider text-sm px-8 py-3 hover:bg-[#b00217] transition-colors w-fit"
            >
              Read More
            </a>
          </div>
        </div>
      ))}

      {/* Dot / pill indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-8 bg-bka-gold'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
