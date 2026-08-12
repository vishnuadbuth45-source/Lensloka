'use client'

import Image from 'next/image'
import Link from 'next/link'

type Location = {
  id: string
  name: string
  status: 'Verified' | 'Coming Soon'
  x: number
  y: number
}

const locations: Location[] = [
  { id: '1', name: 'Hyderabad', status: 'Verified', x: 72, y: 41 },
  { id: '2', name: 'Vijayawada', status: 'Verified', x: 80, y: 48 },
  { id: '3', name: 'Visakhapatnam', status: 'Verified', x: 84, y: 32 },
  { id: '4', name: 'Rajahmundry', status: 'Verified', x: 82, y: 44 },
  { id: '5', name: 'Bengaluru', status: 'Verified', x: 77, y: 58 },
  { id: '6', name: 'Chennai', status: 'Verified', x: 80, y: 65 },
  { id: '7', name: 'Nellore', status: 'Verified', x: 80, y: 60 },
  { id: '8', name: 'Guntur', status: 'Verified', x: 79, y: 50 },
]

export function LocationMap() {
  return (
    <section
      id="locations"
      className="bg-background py-16 lg:py-24"
      aria-labelledby="locations-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-3">
          <div className="inline-flex w-fit rounded-full border border-border bg-secondary/40 px-3 py-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              EXPLORE BY REGION
            </span>
          </div>
          <h2
            id="locations-heading"
            className="font-display text-4xl font-medium uppercase tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl"
          >
            Discover talent near you.
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground text-pretty">
            Navigate our network to discover top-tier visual creators in major hubs across India.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Side - Locations Grid */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {locations.map((location) => (
                <Link
                  key={location.id}
                  href={`/creators?location=${location.name.toLowerCase()}`}
                  className="group relative flex items-center justify-between rounded-xl border border-border bg-card/40 px-5 py-4 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span className="text-left">
                    <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                      {location.name}
                    </h3>
                  </span>
                  <span className="ml-2 shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {location.status}
                  </span>
                </Link>
              ))}
            </div>

            {/* View All Button */}
            <Link
              href="/locations"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              View All Locations
            </Link>
          </div>

          {/* Right Side - India Map */}
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-md">
              <svg
                viewBox="0 0 100 130"
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))' }}
              >
                {/* India Map Path - More Detailed */}
                <g>
                  <path
                    d="M 68.4 7.4 L 72 7 L 74.5 8.5 L 77 7.5 L 79.5 8 L 81.5 9.5 L 83 12 L 84.5 15 L 85 18.5 L 85.5 22 L 86 26 L 86.5 30 L 87 34 L 87.5 38 L 87.8 42 L 88 46 L 88.2 50 L 88.5 54 L 88.8 58 L 89 62 L 88.5 66 L 88 68.5 L 86.5 70 L 85 71 L 83 71.5 L 81 72 L 79 72.5 L 77 73 L 75.5 74 L 73 74.5 L 71 75 L 69 75.5 L 67 76 L 65 76.5 L 63.5 77 L 62 77 L 60.5 76 L 59 74.5 L 57.5 73 L 56 71.5 L 54.5 70 L 53 68.5 L 51.5 67 L 50 65.5 L 48.5 64 L 47 62.5 L 45.5 61 L 44 59.5 L 42.5 58 L 41 56.5 L 40 54.5 L 39 52 L 38.5 49 L 38 46 L 37.5 42 L 37.2 38 L 37 34 L 36.8 30 L 36.5 26 L 36 22 L 35.5 18 L 35 14.5 L 34.5 11 L 34.2 9 L 34 8 L 35.5 8.5 L 37 9 L 39 9.5 L 41 10 L 43 10.5 L 45 11 L 47 11.5 L 49 12 L 51 12.5 L 53 13 L 55 13.5 L 57 14 L 59 14.5 L 61 14.8 L 63 14.5 L 65 14 L 66.5 12 L 68 9.5 L 68.4 7.4 Z"
                    fill="#1e1b4b"
                    stroke="#6366f1"
                    strokeWidth="0.4"
                    opacity="0.7"
                  />
                  
                  {/* South India Peninsula */}
                  <path
                    d="M 65.5 77 L 67.5 78.5 L 69.5 80 L 71 81 L 72.5 82 L 73 82.5 L 73.5 83 L 74 83.5 L 74.5 84 L 75 84.5 L 75.5 85 L 76 84.5 L 76.5 83.5 L 77 82.5 L 76.5 81 L 76 80 L 75.5 79 L 74.5 78 L 73 77.5 L 71.5 77 L 70 76.5 L 68.5 76.5 L 67 76.8 L 65.5 77 Z"
                    fill="#1e1b4b"
                    stroke="#6366f1"
                    strokeWidth="0.4"
                    opacity="0.7"
                  />
                </g>

                {/* City Pins with accurate coordinates */}
                {locations.map((location) => (
                  <g key={location.id} transform={`translate(${location.x}, ${location.y})`}>
                    {/* Outer glow circle */}
                    <circle
                      cx="0"
                      cy="0"
                      r="2.5"
                      fill="#fbbf24"
                      opacity="0.3"
                    />
                    {/* Middle ring */}
                    <circle
                      cx="0"
                      cy="0"
                      r="1.8"
                      fill="#fbbf24"
                      opacity="0.6"
                    />
                    {/* Main pin */}
                    <circle cx="0" cy="0" r="1.2" fill="#fbbf24" opacity="1" />
                    
                    {/* City label with background */}
                    <rect
                      x="-3.5"
                      y="-3.5"
                      width="7"
                      height="2"
                      fill="rgba(0, 0, 0, 0.6)"
                      rx="1"
                    />
                    <text
                      x="0"
                      y="-1.2"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="1.6"
                      fontWeight="600"
                      className="pointer-events-none"
                    >
                      {location.name.split(' ')[0]}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
