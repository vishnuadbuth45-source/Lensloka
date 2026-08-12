'use client'

import { CheckCircle2 } from 'lucide-react'

type CreatorProfile = {
  name: string
  tier: 'ELITE' | 'PRO' | 'RISING'
  specialization: string
  experience: string
  events: number
  rating: number
  responseTime: string
  lensScore: number
  reviewQuality: number
  responseRate: number
  completion: number
  image: string
}

const creator: CreatorProfile = {
  name: 'Aisha Verma',
  tier: 'ELITE',
  specialization: 'Cinematographer & Colorist',
  experience: '8 Yrs',
  events: 124,
  rating: 4.9,
  responseTime: '1 Hr',
  lensScore: 98.5,
  reviewQuality: 99,
  responseRate: 100,
  completion: 98,
  image: '🎥',
}

const verifications = [
  'Identity & Gear Verification',
  'Secure Escrow Payments',
  'Real-Time Response Tracking',
  'Quality Assured Deliverables',
]

export function TrustVerification() {
  return (
    <section
      className="bg-background py-16 lg:py-24"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center">
            {/* Label */}
            <div className="mb-6 inline-flex w-fit rounded-full border border-border bg-secondary/40 px-3 py-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Trust & Verification
              </span>
            </div>

            {/* Heading */}
            <h2
              id="trust-heading"
              className="font-display text-4xl font-medium uppercase tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl mb-6"
            >
              Trust is not assumed. It's calculated.
            </h2>

            {/* Description */}
            <p className="text-base text-muted-foreground text-pretty mb-8">
              Our proprietary <span className="font-semibold text-foreground">Lens Score™</span> analyzes over 40 data points including completion rates, verified client reviews, and portfolio consistency.
            </p>

            {/* Verification List */}
            <div className="space-y-4">
              {verifications.map((verification) => (
                <div
                  key={verification}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary flex-none" />
                  <span className="text-base font-medium text-foreground">
                    {verification}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Creator Card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden">
              {/* Card Header with Background */}
              <div className="relative h-32 bg-gradient-to-br from-primary/20 to-primary/5 border-b border-border">
                {/* Creator Avatar */}
                <div className="absolute -bottom-6 left-6 flex items-center gap-3">
                  <div className="h-20 w-20 rounded-full border-4 border-card bg-secondary/60 flex items-center justify-center text-4xl shadow-lg">
                    {creator.image}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="pt-10 px-6 pb-6">
                {/* Name and Tier */}
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-bold text-foreground">
                    {creator.name}
                  </h3>
                  <span className="inline-block px-2.5 py-1 rounded-md bg-purple-600/20 text-purple-400 text-xs font-bold border border-purple-500/30">
                    {creator.tier}
                  </span>
                </div>

                {/* Specialization */}
                <p className="text-sm text-muted-foreground mb-6">
                  {creator.specialization}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-3 mb-8 pb-8 border-b border-border">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">
                      {creator.experience}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Experience
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">
                      {creator.events}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Events
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">
                      {creator.rating}★
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Rating
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">
                      {creator.responseTime}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Response
                    </p>
                  </div>
                </div>

                {/* Lens Score Section */}
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Total Lens Score
                    </span>
                    <span className="text-3xl font-bold text-yellow-400">
                      ⚡ {creator.lensScore}
                    </span>
                  </div>

                  {/* Score Breakdowns */}
                  <div className="space-y-3">
                    {/* Review Quality */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Review Quality
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {creator.reviewQuality}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full"
                          style={{
                            width: `${creator.reviewQuality}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Response Rate */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Response Rate
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {creator.responseRate}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full"
                          style={{
                            width: `${creator.responseRate}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Completion */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Completion
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {creator.completion}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full"
                          style={{
                            width: `${creator.completion}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
