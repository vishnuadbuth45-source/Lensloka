'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Testimonial = {
  id: string
  quote: string
  author: string
  eventType: string
  location: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'We needed a cinematographer for a high-stakes product launch. Got 3 verified options the same day, chose Rohan and the video went viral. Worth every rupee.',
    author: 'Arjun Kapoor',
    eventType: 'Product Launch',
    location: 'Bengaluru',
    rating: 5,
  },
  {
    id: '2',
    quote:
      'As a fashion brand, visuals are everything. The creators on this platform are genuinely world-class. The escrow payment system gave us complete peace of mind.',
    author: 'Meera Pillai',
    eventType: 'Fashion Shoot',
    location: 'Chennai',
    rating: 5,
  },
  {
    id: '3',
    quote:
      'Best decision for our wedding. The entire process was seamless, from discovery to final delivery. Our photographer exceeded all expectations.',
    author: 'Priya & Vikram',
    eventType: 'Wedding',
    location: 'Hyderabad',
    rating: 5,
  },
  {
    id: '4',
    quote:
      'The Lens Score made it so easy to compare creators. We knew exactly what we were getting. Professional, reliable, and fantastic results.',
    author: 'Rajesh Sharma',
    eventType: 'Corporate Event',
    location: 'Mumbai',
    rating: 5,
  },
  {
    id: '5',
    quote:
      'Finding the right videographer was always a hassle. Lens Loka changed that. Fast, transparent, and quality creators at every tier.',
    author: 'Divya Singh',
    eventType: 'Birthday Celebration',
    location: 'Delhi',
    rating: 5,
  },
]

export function ClientsTestimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 5000) // Auto-scroll every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const goToPrevious = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const testimonial = testimonials[current]

  return (
    <section
      className="bg-background py-16 lg:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2
            id="testimonials-heading"
            className="font-display text-4xl font-medium uppercase tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl"
          >
            Clients Love Lens Loka
          </h2>
          <p className="mt-4 text-base text-muted-foreground text-pretty">
            Real stories from real events across India.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Testimonial Card */}
          <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-8 sm:p-12 text-center">
            {/* Star Rating */}
            <div className="mb-6 flex justify-center gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i} className="text-2xl">
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="mb-8">
              <p className="text-lg sm:text-xl font-medium text-foreground italic text-balance leading-relaxed">
                "{testimonial.quote}"
              </p>
            </blockquote>

            {/* Author Info */}
            <div className="border-t border-border pt-6">
              <p className="text-lg font-semibold text-foreground">
                {testimonial.author}
              </p>
              <p className="mt-1 text-sm text-muted-foreground uppercase tracking-wider">
                {testimonial.eventType} • {testimonial.location}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={goToPrevious}
              className="inline-flex items-center justify-center rounded-full border border-border bg-secondary/40 p-2 text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Indicator Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === current
                      ? 'w-8 bg-primary'
                      : 'w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="inline-flex items-center justify-center rounded-full border border-border bg-secondary/40 p-2 text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
