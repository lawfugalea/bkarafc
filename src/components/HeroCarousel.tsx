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
  const [animKey, setAnimKey] = useState(0)

  const goTo = useCallback((index: number) => {
    setCurrent(index)
    setAnimKey((k) => k + 1)
  }, [])

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length)
    setAnimKey((k) => k + 1)
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
      {/* Slide backgrounds */}
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
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(8,8,8,0.95), rgba(8,8,8,0.4) 50%, rgba(8,8,8,0.5))',
            }}
          />
        </div>
      ))}

      {/* Bottom-left content — re-mounts on each transition so stagger replays */}
      {slides.map((slide, i) =>
        i !== current ? null : (
          <div
            key={animKey}
            className="absolute bottom-0 left-0 right-0 z-10 pb-14"
          >
            <div className="max-w-7xl mx-auto px-6">
              {/* Eyebrow — gold category + date */}
              <div
                className="hero-item flex items-center gap-3 mb-3"
                style={{ animationDelay: '0.05s' }}
              >
                <span className="text-bka-gold text-xs font-semibold uppercase tracking-widest">
                  {slide.category}
                </span>
                <span className="text-bka-gold/40">·</span>
                <span className="text-bka-gold/60 text-xs uppercase tracking-wider">
                  {slide.date}
                </span>
              </div>

              {/* Headline — ~46px, max-width 600px */}
              <h2
                className="hero-item font-display font-extrabold italic uppercase text-white leading-[0.92] mb-6"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.875rem)',
                  maxWidth: '600px',
                  animationDelay: '0.18s',
                }}
              >
                {slide.title}
              </h2>

              {/* Buttons */}
              <div
                className="hero-item flex flex-wrap gap-3"
                style={{ animationDelay: '0.32s' }}
              >
                <a
                  href={slide.href}
                  className="bg-bka-red text-white font-semibold uppercase tracking-wider text-sm px-7 py-2.5 hover:bg-[#b00217] transition-colors"
                >
                  Read More
                </a>
                <a
                  href="/news"
                  className="border border-white/30 text-white/80 font-semibold uppercase tracking-wider text-sm px-7 py-2.5 hover:border-white/60 hover:text-white transition-colors"
                >
                  All News
                </a>
              </div>
            </div>
          </div>
        )
      )}

      {/* Dots — bottom-right, gold = active */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 right-6 flex items-center gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-8 bg-bka-gold'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Diagonal red/gold stripe accent — bottom-right edge */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 z-20"
        style={{
          width: '160px',
          height: '6px',
          background: 'linear-gradient(to right, #D0021B 60%, #F5A623 60%)',
          clipPath: 'polygon(24px 0, 100% 0, 100% 100%, 0 100%)',
        }}
      />
    </section>
  )
}
