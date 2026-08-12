'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export type Slide = {
  image: string
  alt: string
  category: string
  title: string
  description: string
}

const SLIDES: Slide[] = [
  {
    image: '/carousel/shot-2.png',
    alt: 'Fashion model in a red suit seated in a dark studio',
    category: 'Creative Campaigns',
    title: 'Fashion Shoots',
    description: 'Editorial bridal photography, luxury ethnic styling.',
  },
  {
    image: '/carousel/shot-3.png',
    alt: 'Bride in ornate red and gold ethnic wear',
    category: 'Weddings & Events',
    title: 'Bridal Editorials',
    description: 'Timeless ethnic couture captured with cinematic flair.',
  },
  {
    image: '/carousel/shot-4.png',
    alt: 'Luxury perfume and cosmetics product photography',
    category: 'Brands & Commerce',
    title: 'Product Campaigns',
    description: 'Luxury still-life for beauty, fragrance and lifestyle brands.',
  },
  {
    image: '/carousel/shot-1.png',
    alt: 'Aerial view of a winding mountain road through misty forest',
    category: 'Travel & Locations',
    title: 'On-Location Shoots',
    description: 'Scout stunning destinations with pro location crews.',
  },
]

const AUTOPLAY_MS = 6000

export function HeroCarousel() {
  const [active, setActive] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((index: number) => {
    setActive((index + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length)
    }, AUTOPLAY_MS)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [])

  const restart = useCallback(
    (index: number) => {
      goTo(index)
      if (timer.current) clearInterval(timer.current)
      timer.current = setInterval(() => {
        setActive((a) => (a + 1) % SLIDES.length)
      }, AUTOPLAY_MS)
    },
    [goTo],
  )

  const current = SLIDES[active]

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-background">
      {/* Background image stack */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.image + i}
          aria-hidden={i !== active}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000 ease-out',
            i === active ? 'opacity-100' : 'opacity-0',
          )}
        >
          <Image
            src={slide.image || '/placeholder.svg'}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Cinematic overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/30" />

      {/* Slide indicators */}
      <div className="absolute left-1/2 top-24 z-20 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => restart(i)}
            aria-label={`Go to slide ${i + 1}: ${slide.title}`}
            aria-current={i === active}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i === active
                ? 'w-8 bg-foreground'
                : 'w-1.5 bg-foreground/40 hover:bg-foreground/70',
            )}
          />
        ))}
      </div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-16 lg:px-12 lg:pb-20">
        <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-foreground/85 sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block text-balance">Every visual need.</span>
          <span className="block text-balance">One platform.</span>
        </h1>

        <div className="mt-8 max-w-md" key={active}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary animate-in fade-in slide-in-from-bottom-2 duration-500">
            {current.category}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground animate-in fade-in slide-in-from-bottom-2 duration-500">
            {current.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-500">
            {current.description}
          </p>

          {/* Inline CTA (mobile) */}
          <a
            href="#services"
            className="mt-6 inline-flex rounded-full bg-foreground/90 px-8 py-3.5 text-sm font-semibold text-background shadow-lg backdrop-blur transition-colors hover:bg-foreground lg:hidden"
          >
            Explore Services
          </a>
        </div>
      </div>

      {/* Centered CTA (desktop) */}
      <div className="absolute inset-x-0 bottom-20 z-20 hidden justify-center lg:flex">
        <a
          href="#services"
          className="rounded-full bg-foreground/90 px-8 py-3.5 text-sm font-semibold text-background shadow-lg backdrop-blur transition-colors hover:bg-foreground"
        >
          Explore Services
        </a>
      </div>
    </section>
  )
}
