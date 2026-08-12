'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp, Check, Star, Zap, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

type BenefitCard = {
  id: string
  icon: React.ReactNode
  title: string
  description: string
}

type RequirementItem = {
  id: string
  title: string
  description: string
}

type FAQItem = {
  id: string
  question: string
  answer: string
}

const benefits: BenefitCard[] = [
  {
    id: '1',
    icon: <Zap className="w-6 h-6" />,
    title: 'Quick & Easy Setup',
    description: 'Get verified and start accepting bookings within 48 hours. Simple onboarding, zero complexity.',
  },
  {
    id: '2',
    icon: <Star className="w-6 h-6" />,
    title: 'Build Your Lens Score',
    description: 'Transparent ratings system rewards quality work. Higher scores = more bookings and better rates.',
  },
  {
    id: '3',
    icon: <Shield className="w-6 h-6" />,
    title: '100% Escrow Protection',
    description: 'Payment held safely with us. You get paid only after client approves deliverables.',
  },
  {
    id: '4',
    icon: <Zap className="w-6 h-6" />,
    title: '₹0 Joining Fee',
    description: 'No upfront costs. No hidden charges. We only earn when you earn.',
  },
  {
    id: '5',
    icon: <Star className="w-6 h-6" />,
    title: 'Get Matches Instantly',
    description: '72+ new client matches per week on average. AI-powered matching finds your perfect fit.',
  },
  {
    id: '6',
    icon: <Shield className="w-6 h-6" />,
    title: 'Dedicated Creator Support',
    description: '24/7 support team ready to help with bookings, disputes, and growth strategies.',
  },
]

const requirements: RequirementItem[] = [
  {
    id: '1',
    title: 'Portfolio Quality',
    description: 'Demonstrate at least 3-5 previous projects. We review quality before verification.',
  },
  {
    id: '2',
    title: 'Professional Rates',
    description: 'Set competitive pricing aligned with market standards for your specialization.',
  },
  {
    id: '3',
    title: 'Reliability',
    description: 'Maintain 95%+ response rate and 90%+ completion rate on all bookings.',
  },
  {
    id: '4',
    title: 'Professional Equipment',
    description: 'Use industry-standard cameras, lenses, and production gear for quality deliverables.',
  },
  {
    id: '5',
    title: 'Clear Communication',
    description: 'Respond to client inquiries within 24 hours. Discuss briefs thoroughly before shoots.',
  },
  {
    id: '6',
    title: 'Professional Ethics',
    description: 'Sign our Creator Code of Conduct. Respect client confidentiality and copyrights.',
  },
]

const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'How long does the verification process take?',
    answer:
      "Most creators get verified within 48 hours. We review your portfolio, rates, and background. For high-tier applications (ELITE tier), it may take up to 5 business days for a thorough review.",
  },
  {
    id: '2',
    question: 'What is the Lens Score and how does it work?',
    answer:
      'Lens Score is a 0-100 rating based on your reviews, completion rate, response time, and client feedback. It starts at 50 for new creators and increases as you successfully complete bookings. A high Lens Score unlocks better bookings and higher rates.',
  },
  {
    id: '3',
    question: 'Can I set my own rates?',
    answer:
      'Absolutely! You have full control over your pricing. We suggest market-aligned rates based on your tier and location, but you can adjust anytime. Most creators increase rates as their Lens Score improves.',
  },
  {
    id: '4',
    question: 'How do I get paid?',
    answer:
      'Payment flows directly to your bank account via NEFT transfer. Money is released 24 hours after you submit deliverables and the client approves them. No waiting, no middleman fees.',
  },
  {
    id: '5',
    question: 'What if a client disputes the payment?',
    answer:
      'Our escrow system protects you. If there\'s a dispute, we review the project deliverables against the original brief. You only lose payment if we determine you failed to meet agreed-upon requirements.',
  },
  {
    id: '6',
    question: 'Can I work with multiple platforms?',
    answer:
      'Yes! You can use Lens Loka alongside other platforms. However, once you accept a booking, you must deliver on that booking exclusively and on time.',
  },
  {
    id: '7',
    question: 'How do I increase my Lens Score?',
    answer:
      'Complete bookings on time, get positive reviews, maintain high response rates, and deliver quality work that exceeds expectations. Even one bad booking can impact your score significantly.',
  },
  {
    id: '8',
    question: 'Are there creator tiers?',
    answer:
      'Yes! We have RISING (new creators), PRO (established), and ELITE (top performers) tiers. Higher tiers get featured in search results, access to premium bookings, and priority support.',
  },
]

function BenefitCard({ benefit }: { benefit: BenefitCard }) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-8 hover:border-primary/50 transition-colors">
      <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
        {benefit.icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-3">{benefit.title}</h3>
      <p className="text-muted-foreground text-sm">{benefit.description}</p>
    </div>
  )
}

function RequirementItem({ item }: { item: RequirementItem }) {
  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-b-0">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
          <Check className="w-4 h-4" />
        </div>
      </div>
      <div>
        <h4 className="text-base font-semibold text-foreground mb-1">{item.title}</h4>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
    </div>
  )
}

function FAQItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-card/40 hover:bg-card/60 transition-colors"
      >
        <span className="font-semibold text-foreground text-left">{item.question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-card/20 border-t border-border text-muted-foreground text-sm">
          {item.answer}
        </div>
      )}
    </div>
  )
}

export default function JoinCreatorPage() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  return (
    <main className="relative bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <div className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Join Our Community
              </span>
            </div>
            <h1 className="font-display text-4xl font-medium uppercase tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl mb-6">
              Turn Your Talent Into Consistent Bookings
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground text-pretty mb-8">
              Join 500+ verified creators earning ₹2L-₹10L+ per month. Get matched with premium clients, build your Lens Score, and scale your business without upfront costs or commissions eating into your rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 px-8 py-3 text-base font-semibold text-primary-foreground transition-colors">
                Apply Now →
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-border bg-secondary/40 hover:bg-secondary/60 px-8 py-3 text-base font-semibold text-foreground transition-colors"
              >
                View Success Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Verified Creators</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">₹2L+</div>
              <p className="text-muted-foreground">Monthly Earnings (Avg)</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">48hrs</div>
              <p className="text-muted-foreground">Verification Time</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">72+</div>
              <p className="text-muted-foreground">New Matches/Week</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
              Why Join Lens Loka?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built by creators, for creators. Everything you need to grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <BenefitCard key={benefit.id} benefit={benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
              How to Get Started
            </h2>
            <p className="text-muted-foreground">
              Simple 5-step process to start accepting premium bookings.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Create Your Account',
                description: 'Sign up with your email and mobile number. Takes 2 minutes.',
              },
              {
                step: '02',
                title: 'Complete Your Profile',
                description: 'Upload 3-5 portfolio images, set your rates, and write your bio.',
              },
              {
                step: '03',
                title: 'Verification Review',
                description: 'Our team reviews your portfolio and qualifications (48 hours).',
              },
              {
                step: '04',
                title: 'Start Accepting Bookings',
                description: 'Go LIVE and receive client matches based on your specialization.',
              },
              {
                step: '05',
                title: 'Earn & Grow',
                description: 'Complete bookings, get reviews, and watch your Lens Score climb.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-display font-bold text-xl">
                    {item.step}
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
              Creator Requirements
            </h2>
            <p className="text-muted-foreground">
              We maintain high standards to ensure quality for our clients.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-8">
            {requirements.map((req) => (
              <RequirementItem key={req.id} item={req} />
            ))}
          </div>
        </div>
      </section>

      {/* Creator Tiers Section */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
              Creator Tiers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advance through tiers as you build your Lens Score and reputation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tier: 'RISING',
                color: 'blue',
                lensScore: '0-60',
                benefits: [
                  'Basic creator profile',
                  '5-10 matches/week',
                  'Standard commission rate',
                  'Email support',
                  'Basic analytics',
                ],
              },
              {
                tier: 'PRO',
                color: 'purple',
                lensScore: '61-85',
                benefits: [
                  'Featured profile badge',
                  '20-30 matches/week',
                  'Better rates',
                  'Priority support',
                  'Advanced analytics',
                  'Premium job categories',
                ],
              },
              {
                tier: 'ELITE',
                color: 'yellow',
                lensScore: '86-100',
                benefits: [
                  'Elite badge & featured',
                  '50-100+ matches/week',
                  'Premium rates unlock',
                  '24/7 dedicated support',
                  'Full analytics suite',
                  'Exclusive premium jobs',
                ],
              },
            ].map((tierInfo) => (
              <div
                key={tierInfo.tier}
                className={`rounded-2xl border-2 ${
                  tierInfo.tier === 'PRO'
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card/40'
                } backdrop-blur-sm p-8 hover:border-primary/50 transition-colors`}
              >
                {tierInfo.tier === 'PRO' && (
                  <div className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 mb-4">
                    <span className="text-xs font-semibold text-primary">MOST POPULAR</span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-foreground mb-2">{tierInfo.tier}</h3>
                <p className="text-muted-foreground text-sm mb-6">Lens Score: {tierInfo.lensScore}</p>

                <ul className="space-y-3 mb-8">
                  {tierInfo.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about becoming a creator on Lens Loka.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <FAQItem
                key={faq.id}
                item={faq}
                isOpen={openFAQ === faq.id}
                onToggle={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 sm:p-12 text-center">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 500+ creators already making consistent income on Lens Loka. Apply now and get verified within 48 hours.
            </p>
            <button className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 px-8 py-3 text-base font-semibold text-primary-foreground transition-colors">
              Apply as Creator Now →
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
