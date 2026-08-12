'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

type Service = {
  id: string
  icon: string
  name: string
  startingPrice: string
  description: string
  features: string[]
}

type FAQItem = {
  id: string
  question: string
  answer: string
}

const services: Service[] = [
  {
    id: '1',
    icon: '👨‍👩‍👧‍👦',
    name: 'Family Events Coverage',
    startingPrice: '₹60,000',
    description: 'Heartfelt coverage for weddings, anniversaries, and every family milestone.',
    features: [
      '2 lead photographers',
      'Same-day teaser reel',
      '500+ edited photos',
      'Premium online gallery',
    ],
  },
  {
    id: '2',
    icon: '🎂',
    name: 'Birthday Events',
    startingPrice: '₹18,000',
    description: 'Genuine smiles and candid joy, captured beautifully for every milestone birthday.',
    features: [
      '1 photographer + 1 videographer',
      '150+ edited photos',
      '60-second highlight reel',
      'Decor & candid coverage',
    ],
  },
  {
    id: '3',
    icon: '🏢',
    name: 'Corporate Events',
    startingPrice: '₹35,000',
    description: 'Professional coverage for conferences, launches, and brand gatherings.',
    features: [
      'Multi-camera coverage',
      'Same-day social clips',
      'Speaker & panel photography',
      'Branded highlight video',
    ],
  },
  {
    id: '4',
    icon: '👗',
    name: 'Fashion Shoots',
    startingPrice: '₹45,000',
    description: 'Editorial-grade styling and lighting for campaigns, lookbooks, and portfolios.',
    features: [
      'Studio or outdoor location',
      'Professional retouching',
      'Lookbook-ready exports',
      'Styling coordination support',
    ],
  },
  {
    id: '5',
    icon: '📦',
    name: 'Product Photography',
    startingPrice: '₹20,000',
    description: 'Brand-campaign quality visuals for ecommerce and luxury product listings.',
    features: [
      'White background + lifestyle shots',
      'Ecommerce-ready exports',
      'Up to 15 products',
      '48-hour turnaround',
    ],
  },
  {
    id: '6',
    icon: '🎬',
    name: 'Cinematic Productions',
    startingPrice: '₹80,000',
    description: 'Professional filmmaking setups and elite storytelling for films, reels & ads.',
    features: [
      'Full crew & equipment',
      'Colour-graded final film',
      'Drone shots available',
      'Festival-ready delivery',
    ],
  },
  {
    id: '7',
    icon: '🚁',
    name: 'Drone Coverage',
    startingPrice: '₹15,000',
    description: 'Stunning aerial perspectives that elevate any shoot, anywhere in India.',
    features: [
      '4K aerial footage',
      'Licensed drone pilots',
      'Add-on to any event package',
      'Raw + edited footage delivered',
    ],
  },
]

const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'How fast will I be matched with a creator?',
    answer:
      'Our AI Perfect Match engine typically surfaces 3-5 verified creator options within 72 hours. In most cases, you\'ll get matched much faster depending on your location and service requirements.',
  },
  {
    id: '2',
    question: 'Is payment protected?',
    answer:
      'Yes! We use a secure escrow system. Payment is held safely with us and only released to the creator after you approve the final deliverables. This ensures both you and the creator are protected.',
  },
  {
    id: '3',
    question: 'Can I customise a package?',
    answer:
      'Absolutely! The starting prices are just the baseline. You can customize packages based on your specific needs, additional deliverables, shoot duration, team size, and more. Chat with our matched creators to finalize details.',
  },
  {
    id: '4',
    question: 'Do you cover cities outside the list?',
    answer:
      'We\'re continuously expanding! Currently, we have verified creators in major Indian cities. If your city isn\'t listed, reach out to us and we\'ll help connect you with available talent or put you on our waitlist for new expansions.',
  },
]

function FAQItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-card/40 hover:bg-card/60 transition-colors"
      >
        <span className="text-left font-semibold text-foreground">{item.question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-background border-t border-border">
          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  )
}

export default function ServicesPage() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity">
            <span className="text-sm font-medium text-muted-foreground">← Back</span>
          </Link>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Our Services
              </span>
            </div>
            <h1 className="font-display text-4xl font-medium uppercase tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl mb-4">
              Every visual need, one platform.
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground text-pretty">
              From intimate family functions to large-scale productions — explore every category of visual talent available on Lens Loka.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-colors group"
              >
                {/* Placeholder Image */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-6xl">
                  {service.icon}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {service.name}
                  </h3>
                  <p className="text-primary font-semibold mb-3">{service.startingPrice}</p>
                  <p className="text-sm text-muted-foreground mb-6">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-primary mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={`/creators?service=${service.id}`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-primary hover:bg-primary/90 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors"
                  >
                    Get Matched →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Perfect Match CTA */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 sm:p-12 text-center">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
              Not sure what you need?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let our AI Perfect Match engine recommend the right creator for your brief in under a minute.
            </p>
            <Link
              href="/#ai-match"
              className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 px-8 py-3 text-base font-semibold text-primary-foreground transition-colors"
            >
              Try AI Perfect Match
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our services.
            </p>
          </div>

          {/* FAQs */}
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
    </main>
  )
}
