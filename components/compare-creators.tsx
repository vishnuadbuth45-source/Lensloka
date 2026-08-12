'use client'

import { Button } from '@/components/ui/button'

type Creator = {
  id: string
  name: string
  specialty: string
  specialization: string
  tier: 'ELITE' | 'PRO' | 'RISING'
  rating: number
  lensScore: number
  eventsDone: number
  responseTime: string
  startingPrice: string
  image: string
}

const creators: Creator[] = [
  {
    id: '1',
    name: 'Aisha Verma',
    specialty: 'Wedding & Branding',
    specialization: 'Wedding & Branding',
    tier: 'ELITE',
    rating: 4.9,
    lensScore: 98.5,
    eventsDone: 124,
    responseTime: '1 hr',
    startingPrice: '₹1.2L',
    image: '👰',
  },
  {
    id: '2',
    name: 'Rohan Mehta',
    specialty: 'Corporate & Brand',
    specialization: 'Corporate & Brand',
    tier: 'PRO',
    rating: 4.8,
    lensScore: 95.2,
    eventsDone: 89,
    responseTime: '2 hrs',
    startingPrice: '₹65K',
    image: '🎬',
  },
  {
    id: '3',
    name: 'Priya Nair',
    specialty: 'Fashion & Commercial',
    specialization: 'Fashion & Commercial',
    tier: 'ELITE',
    rating: 5.0,
    lensScore: 99.1,
    eventsDone: 56,
    responseTime: '30 min',
    startingPrice: '₹2L',
    image: '📸',
  },
]

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'ELITE':
      return 'bg-purple-600 text-white'
    case 'PRO':
      return 'bg-blue-600 text-white'
    default:
      return 'bg-gray-600 text-white'
  }
}

export function CompareCreators() {
  return (
    <section className="bg-background py-16 lg:py-24" aria-labelledby="compare-heading">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-3">
          <div className="inline-flex w-fit rounded-full border border-border bg-secondary/40 px-3 py-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              SIDE-BY-SIDE
            </span>
          </div>
          <h2
            id="compare-heading"
            className="font-display text-4xl font-medium uppercase tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl"
          >
            Compare Creators
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground text-pretty">
            Evaluate top creators on what actually matters before you book.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full rounded-2xl border border-border bg-card/30 backdrop-blur-sm">
            <table className="w-full">
              <tbody>
                {/* Criteria Header Row */}
                <tr className="border-b border-border">
                  <td className="px-6 py-4 text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      CRITERIA
                    </span>
                  </td>
                  {creators.map((creator) => (
                    <td key={creator.id} className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="text-3xl">{creator.image}</div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {creator.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {creator.specialty}
                          </p>
                          <span
                            className={`mt-2 inline-block rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${getTierColor(creator.tier)}`}
                          >
                            {creator.tier}
                          </span>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Rating Row */}
                <tr className="border-b border-border">
                  <td className="px-6 py-4 text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      RATING
                    </span>
                  </td>
                  {creators.map((creator) => (
                    <td key={creator.id} className="px-6 py-4 text-center">
                      <span className="text-lg font-semibold text-foreground">
                        {creator.rating}★
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Lens Score Row */}
                <tr className="border-b border-border">
                  <td className="px-6 py-4 text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      LENS SCORE
                    </span>
                  </td>
                  {creators.map((creator) => (
                    <td key={creator.id} className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-yellow-400">
                        {creator.lensScore}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Events Done Row */}
                <tr className="border-b border-border">
                  <td className="px-6 py-4 text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      EVENTS DONE
                    </span>
                  </td>
                  {creators.map((creator) => (
                    <td key={creator.id} className="px-6 py-4 text-center">
                      <span className="text-lg font-semibold text-foreground">
                        {creator.eventsDone}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Response Time Row */}
                <tr className="border-b border-border">
                  <td className="px-6 py-4 text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      RESPONSE TIME
                    </span>
                  </td>
                  {creators.map((creator) => (
                    <td key={creator.id} className="px-6 py-4 text-center">
                      <span className="text-lg font-semibold text-foreground">
                        {creator.responseTime}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Starting Price Row */}
                <tr className="border-b border-border">
                  <td className="px-6 py-4 text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      STARTING PRICE
                    </span>
                  </td>
                  {creators.map((creator) => (
                    <td key={creator.id} className="px-6 py-4 text-center">
                      <span className="text-lg font-semibold text-primary">
                        {creator.startingPrice}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* CTA Row */}
                <tr>
                  <td className="px-6 py-6" />
                  {creators.map((creator) => (
                    <td key={creator.id} className="px-6 py-6 text-center">
                      <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-semibold">
                        Book {creator.name.split(' ')[0]}
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Compare More Creators Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            + Compare More Creators
          </button>
        </div>
      </div>
    </section>
  )
}
