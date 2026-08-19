"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import type { Service } from "@/lib/queries/creators"

type ServicesContentProps = {
  services: Service[]
}

type FAQItem = {
  id: string
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    id: "1",
    question: "How fast will I be matched with a creator?",
    answer:
      "Our AI Perfect Match engine typically surfaces 3-5 verified creator options within 72 hours. In most cases, you'll get matched much faster depending on your location and service requirements.",
  },
  {
    id: "2",
    question: "Is payment protected?",
    answer:
      "Yes! We use a secure escrow system. Payment is held safely with us and only released to the creator after you approve the final deliverables. This ensures both you and the creator are protected.",
  },
  {
    id: "3",
    question: "Can I customise a package?",
    answer:
      "Absolutely! The starting prices are just the baseline. You can customize packages based on your specific needs, additional deliverables, shoot duration, team size, and more. Chat with our matched creators to finalize details.",
  },
  {
    id: "4",
    question: "Do you cover cities outside the list?",
    answer:
      "We're continuously expanding! Currently, we have verified creators in major Indian cities. If your city isn't listed, reach out to us and we'll help connect you with available talent or put you on our waitlist for new expansions.",
  },
]

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-card/40 hover:bg-card/60 transition-colors"
      >
        <span className="text-left font-semibold text-foreground">
          {item.question}
        </span>

        {isOpen ? (
          <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="px-6 py-4 bg-background border-t border-border">
          <p className="text-muted-foreground leading-relaxed">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  )
}

export default function ServicesContent({
  services,
}: ServicesContentProps) {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  return (
    <main className="relative min-h-screen bg-background text-foreground">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-8">

          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity"
          >
            <span className="text-sm font-medium text-muted-foreground">
              ← Back
            </span>
          </Link>

        </div>
      </div>


      {/* =====================================================
          SERVICES
          ===================================================== */}

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
              From intimate family functions to large-scale productions —
              explore every category of visual talent available on Lens Loka.
            </p>

          </div>


          {/* Services Grid */}

          {services.length > 0 ? (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {services.map((service) => (

                <div
                  key={service.id}
                  className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-colors group"
                >

                  {/* Placeholder visual */}

                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-6xl">
                    🎬
                  </div>


                  {/* Content */}

                  <div className="p-6">

                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {service.name}
                    </h3>


                    {service.description && (
                      <p className="text-sm text-muted-foreground mb-6">
                        {service.description}
                      </p>
                    )}


                    {/* CTA */}

                    <Link
                      href={`/creators/${service.slug}`}
                      className="inline-flex w-full items-center justify-center rounded-full bg-primary hover:bg-primary/90 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors"
                    >
                      View Creators →
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No services are currently available.
              </p>
            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          AI PERFECT MATCH
          ===================================================== */}

      <section className="py-16 lg:py-24 border-b border-border">

        <div className="mx-auto max-w-4xl px-6">

          <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 sm:p-12 text-center">

            <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
              Not sure what you need?
            </h2>

            <p className="text-muted-foreground mb-8">
              Let our AI Perfect Match engine recommend the right creator for
              your brief in under a minute.
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


      {/* =====================================================
          FAQ
          ===================================================== */}

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


          <div className="space-y-4">

            {faqs.map((faq) => (

              <FAQItem
                key={faq.id}
                item={faq}
                isOpen={openFAQ === faq.id}
                onToggle={() =>
                  setOpenFAQ(
                    openFAQ === faq.id ? null : faq.id
                  )
                }
              />

            ))}

          </div>

        </div>

      </section>

    </main>
  )
}