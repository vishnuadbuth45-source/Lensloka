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
    image: '🎂',
    specialization: 'Birthday & Family Events',
    tier: 'RISING',
    rating: 4.5,
    events: 42,
    price: 'From ₹35K',
    lensScore: 86.1,
  },
]

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'ELITE':
      return 'bg-purple-600/20 text-purple-400 border-purple-500/30'
    case 'PRO':
      return 'bg-blue-600/20 text-blue-400 border-blue-500/30'
    default:
      return 'bg-gray-600/20 text-gray-400 border-gray-500/30'
  }
}

export default function CreatorsPage() {
  const searchParams = useSearchParams()
  const serviceId = searchParams.get('service')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCreators = useMemo(() => {
    return creators.filter((creator) => {
      const matchesSearch =
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
  }, [searchQuery])

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link href="/services" className="inline-flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity">
            <span className="text-sm font-medium text-muted-foreground">← Back to Services</span>
          </Link>
          <h1 className="font-display text-4xl font-medium uppercase tracking-tight text-foreground sm:text-5xl">
            Browse Creators
          </h1>
          <p className="mt-3 text-muted-foreground">
            Choose from verified creators matched to your needs. All creators are vetted and rated by clients.
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="border-b border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search creators by name or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-border bg-background pl-12 pr-6 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Creators Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          {filteredCreators.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No creators found matching "{searchQuery}". Try a different search.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredCreators.length} creator{filteredCreators.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCreators.map((creator) => (
                  <div
                    key={creator.id}
                    className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all group"
                  >
                    {/* Image */}
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-8xl group-hover:scale-105 transition-transform">
                      {creator.image}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Name and Tier */}
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-foreground">{creator.name}</h3>
                        <span
                          className={`shrink-0 rounded-md px-2 py-1 text-xs font-bold border ${getTierColor(creator.tier)}`}
                        >
                          {creator.tier}
                        </span>
                      </div>

                      {/* Specialization */}
                      <p className="text-xs text-muted-foreground mb-4">{creator.specialization}</p>

                      {/* Stats */}
                      <div className="mb-4 space-y-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-foreground">{creator.rating}★</span>
                          <span className="text-xs text-muted-foreground">({creator.events} events)</span>
                        </div>
                        <p className="text-sm font-semibold text-primary">{creator.price}</p>
                        <p className="text-xs text-yellow-400 font-semibold">Lens Score: {creator.lensScore}</p>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full rounded-full bg-primary hover:bg-primary/90 px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors">
                        Book {creator.name.split(' ')[0]}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="mt-12 flex justify-center">
                <button className="rounded-full border border-border bg-secondary/40 hover:bg-secondary px-8 py-3 text-sm font-medium text-foreground transition-colors">
                  Load More Creators
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
