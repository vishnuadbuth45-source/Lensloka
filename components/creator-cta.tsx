'use client'

import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

type CreatorBenefit = {
  icon: string
  title: string
  description: string
}

const benefits: CreatorBenefit[] = [
  {
    icon: '📋',
    title: 'Apply & Verify',
    description:
      'Submit your portfolio and complete identity + gear verification.',
  },
  {
    icon: '🤖',
    title: 'Get AI-Matched',
    description:
      'Our algorithm surfaces you to clients whose brief matches your style.',
  },
  {
    icon: '💰',
    title: 'Earn Securely',
    description:
      'Receive payment via escrow — released the moment the client approves.',
  },
]

const stats = [
  { value: '₹0', label: 'Joining Fee' },
  { value: '72 hrs', label: 'First Match' },
  { value: '100%', label: 'Escrow Safe' },
]

export function CreatorCTA() {
  return (
    <section
      id="creator-cta"
      className="bg-background py-16 lg:py-24"
      aria-labelledby="creator-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 sm:p-12 lg:p-16">
          {/* Label */}
          <div className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              For Creators
            </span>
          </div>

          {/* Heading and Description */}
          <div className="max-w-2xl mb-12">
            <h2
              id="creator-heading"
              className="font-display text-4xl font-medium uppercase tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl mb-6"
            >
              Turn your craft into a career.
            </h2>
            <p className="text-base text-muted-foreground text-pretty">
              Join 500+ verified photographers, videographers, and cinematographers earning on Lens Loka. Get matched with clients who value quality, get paid securely, and build your reputation with every shoot.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-8 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-4 text-center"
              >
                <p className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link href="/join-creator" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-8 py-3 text-sm sm:text-base font-semibold text-primary-foreground transition-colors mb-12 sm:mb-16">
            Apply as a Creator →
          </Link>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-6"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
