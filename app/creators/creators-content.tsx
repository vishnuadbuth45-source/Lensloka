'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Star, Search } from 'lucide-react'
import { useState, useMemo } from 'react'

type Creator = {
  id: string
  name: string
  image: string
  specialization: string
  tier: 'ELITE' | 'PRO' | 'RISING'
  rating: number
  events: number
  price: string
  lensScore: number
}

const creators: Creator[] = [
  {
    id: '1',
    name: 'Aisha Verma',
    image: '🎥',
    specialization: 'Cinematographer & Colorist',
    tier: 'ELITE',
    rating: 4.9,
    events: 124,
    price: 'From ₹1.2L',
    lensScore: 98.5,
  },
  {
    id: '2',
    name: 'Rohan Mehta',
    image: '📸',
    specialization: 'Wedding & Event Photographer',
    tier: 'PRO',
    rating: 4.8,
    events: 89,
    price: 'From ₹65K',
    lensScore: 95.2,
  },
  {
    id: '3',
    name: 'Priya Nair',
    image: '🎬',
    specialization: 'Fashion & Commercial Shooter',
    tier: 'ELITE',
    rating: 5.0,
    events: 56,
    price: 'From ₹2L',
    lensScore: 99.1,
  },
  {
    id: '4',
    name: 'Vikram Singh',
    image: '🎞️',
    specialization: 'Corporate & Event Specialist',
    tier: 'PRO',
    rating: 4.7,
    events: 102,
    price: 'From ₹80K',
    lensScore: 92.3,
  },
  {
    id: '5',
    name: 'Divya Kapoor',
    image: '📷',
    specialization: 'Product & Ecommerce Photographer',
    tier: 'RISING',
    rating: 4.6,
    events: 34,
    price: 'From ₹45K',
    lensScore: 88.5,
  },
  {
    id: '6',
    name: 'Arjun Desai',
    image: '🚁',
    specialization: 'Aerial & Drone Cinematography',
    tier: 'ELITE',
    rating: 4.9,
    events: 78,
    price: 'From ₹1.5L',
    lensScore: 97.8,
  },
  {
    id: '7',
    name: 'Meera Pillai',
    image: '👗',
    specialization: 'Fashion & Style Photographer',
    tier: 'PRO',
    rating: 4.8,
    events: 67,
    price: 'From ₹90K',
    lensScore: 94.2,
  },
  {
    id: '8',
    name: 'Nikhil Patel',
    image: '🎤',
    specialization: 'Live Event & Concert Filmmaker',
    tier: 'RISING',
    rating: 4.5,
    events: 28,
    price: 'From ₹50K',
    lensScore: 85.7,
  },
]

function getTierColor(tier: string): string {
  switch (tier) {
    case 'ELITE':
      return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
    case 'PRO':
      return 'bg-purple-500/20 text-purple-500 border-purple-500/30'
    case 'RISING':
      return 'bg-blue-500/20 text-blue-500 border-blue-500/30'
    default:
      return 'bg-muted text-muted-foreground border-border'
  }
}

export function CreatorsContent() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCreators = useMemo(() => {
    let filtered = creators

    // Filter by search term (name or specialization)
    if (searchTerm) {
      filtered = filtered.filter(
        (creator) =>
          creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          creator.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [searchTerm])

  return (
    <main className="relative bg-background text-foreground">
      {/* Header Section */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <div className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Find Your Creator
              </span>
            </div>
            <h1 className="font-display text-4xl font-medium uppercase tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl mb-6">
              World-Class Creators
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground text-pretty">
              Browse and compare 500+ verified photographers, videographers, and cinematographers. Filter by specialization, tier, or use our AI to find your perfect match.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters Section */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="mx-auto max-w-4xl px-6">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-border bg-card/40 pl-12 pr-6 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Creators Grid Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          {filteredCreators.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-muted-foreground">
                  Showing {filteredCreators.length} creator{filteredCreators.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCreators.map((creator) => (
                  <div
                    key={creator.id}
                    className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-colors group flex flex-col"
                  >
                    {/* Avatar */}
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-7xl">
                      {creator.image}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Tier Badge */}
                      <div className="mb-3">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getTierColor(
                            creator.tier
                          )}`}
                        >
                          {creator.tier}
                        </span>
                      </div>

                      {/* Name */}
                      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {creator.name}
                      </h3>

                      {/* Specialization */}
                      <p className="text-sm text-muted-foreground mb-4">{creator.specialization}</p>

                      {/* Stats */}
                      <div className="space-y-2 mb-6 text-sm flex-grow">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Rating</span>
                          <span className="font-semibold text-foreground flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            {creator.rating}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Events</span>
                          <span className="font-semibold text-foreground">{creator.events}+</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Price</span>
                          <span className="font-semibold text-primary">{creator.price}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <span className="text-muted-foreground">Lens Score</span>
                          <span className="font-bold text-lg text-primary">{creator.lensScore}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full rounded-full bg-primary hover:bg-primary/90 px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors">
                        Book {creator.name.split(' ')[0]}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No creators found matching "{searchTerm}"</p>
              <button
                onClick={() => setSearchTerm('')}
                className="inline-flex items-center justify-center rounded-full border border-border bg-secondary/40 hover:bg-secondary/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
