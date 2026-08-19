'use client'

import { useState } from 'react'
import { Sparkles, ArrowLeft, ArrowRight, Check } from 'lucide-react'

export type Service = {
  id: number
  name: string
  slug: string
  description: string | null
}

export type Location = {
  id: string
  city: string
  state: string | null
  country: string
  slug: string
  creatorCount: number
  status: 'VERIFIED' | 'COMING SOON'
  mapX: number
  mapY: number
}

type BudgetOption = {
  label: string
  min: number
  max: number | null
}

type AiPerfectMatchProps = {
  services: Service[]
  locations: Location[]
}

const budgetOptions: BudgetOption[] = [
  {
    label: 'Under ₹50K',
    min: 0,
    max: 50000,
  },
  {
    label: '₹50K – ₹1.5L',
    min: 50000,
    max: 150000,
  },
  {
    label: '₹1.5L – ₹5L',
    min: 150000,
    max: 500000,
  },
  {
    label: '₹5L & above',
    min: 500000,
    max: null,
  },
]

export function AiPerfectMatch({
  services,
  locations,
}: AiPerfectMatchProps) {
  const [current, setCurrent] = useState(0)

  const [selectedService, setSelectedService] =
    useState<Service | null>(null)

  const [selectedLocation, setSelectedLocation] =
    useState<Location | null>(null)

  const [selectedBudget, setSelectedBudget] =
    useState<BudgetOption | null>(null)

  const [done, setDone] = useState(false)

  const steps = [
    {
      id: 'capture',
      question: 'What are you capturing?',
      options: services,
    },
    {
      id: 'city',
      question: 'Where do you need the creator?',
      options: locations,
    },
    {
      id: 'budget',
      question: 'What is your budget range?',
      options: budgetOptions,
    },
  ]

  const step = steps[current]

  const isLast = current === steps.length - 1

  function selectService(service: Service) {
    setSelectedService(service)
    setCurrent((c) => c + 1)
  }

  function selectLocation(location: Location) {
    setSelectedLocation(location)
    setCurrent((c) => c + 1)
  }

  function selectBudget(budget: BudgetOption) {
    setSelectedBudget(budget)
    setDone(true)
  }

  function back() {
    if (done) {
      setDone(false)
      setCurrent(steps.length - 1)
      return
    }

    setCurrent((c) => Math.max(0, c - 1))
  }

  function reset() {
    setSelectedService(null)
    setSelectedLocation(null)
    setSelectedBudget(null)
    setCurrent(0)
    setDone(false)
  }

  function getResultsUrl() {
    if (!selectedService || !selectedLocation || !selectedBudget) {
      return '#'
    }

    const params = new URLSearchParams({
      service: selectedService.slug,
      location: selectedLocation.slug,
      budgetMin: String(selectedBudget.min),
    })

    if (selectedBudget.max !== null) {
      params.set('budgetMax', String(selectedBudget.max))
    }

    return `/creators/match?${params.toString()}`
  }

  return (
    <section
      className="bg-background"
      aria-labelledby="ai-match-heading"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-8 shadow-2xl sm:p-12">

          {/* Header */}

          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="ai-match-heading"
                className="flex items-center gap-3 font-display text-3xl font-bold tracking-tight sm:text-4xl"
              >
                <Sparkles
                  className="size-7 fill-yellow-300 text-yellow-300"
                  aria-hidden
                />

                AI Perfect Match
              </h2>

              <p className="mt-3 text-muted-foreground">
                Let our engine find your ideal visual creator.
              </p>
            </div>

            <div
              className="mt-2 flex shrink-0 items-center gap-2"
              aria-hidden
            >
              {steps.map((s, i) => (
                <span
                  key={s.id}
                  className={`size-2.5 rounded-full transition-colors ${
                    done || i <= current
                      ? 'bg-primary'
                      : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Body */}

          {!done ? (
            <div className="mt-10">

              <div className="flex items-center gap-3">
                {current > 0 && (
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ArrowLeft className="size-3.5" />
                    Back
                  </button>
                )}

                <h3 className="text-lg font-semibold">
                  {step.question}
                </h3>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {/* SERVICES */}

                {step.id === 'capture' &&
                  services.map((service) => {
                    const selected =
                      selectedService?.id === service.id

                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() =>
                          selectService(service)
                        }
                        className={`group flex items-center justify-between rounded-xl border px-5 py-4 text-left text-sm font-medium transition-all ${
                          selected
                            ? 'border-primary bg-primary/10 text-foreground'
                            : 'border-border bg-secondary/50 text-foreground hover:border-primary/50 hover:bg-secondary'
                        }`}
                      >
                        <span>{service.name}</span>

                        <ArrowRight className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </button>
                    )
                  })}

                {/* LOCATIONS */}

                {step.id === 'city' &&
                  locations.map((location) => {
                    const selected =
                      selectedLocation?.id === location.id

                    return (
                      <button
                        key={location.id}
                        type="button"
                        onClick={() =>
                          selectLocation(location)
                        }
                        className={`group flex items-center justify-between rounded-xl border px-5 py-4 text-left text-sm font-medium transition-all ${
                          selected
                            ? 'border-primary bg-primary/10 text-foreground'
                            : 'border-border bg-secondary/50 text-foreground hover:border-primary/50 hover:bg-secondary'
                        }`}
                      >
                        <span>{location.city}</span>

                        <ArrowRight className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </button>
                    )
                  })}

                {/* BUDGET */}

                {step.id === 'budget' &&
                  budgetOptions.map((budget) => {
                    const selected =
                      selectedBudget?.label === budget.label

                    return (
                      <button
                        key={budget.label}
                        type="button"
                        onClick={() =>
                          selectBudget(budget)
                        }
                        className={`group flex items-center justify-between rounded-xl border px-5 py-4 text-left text-sm font-medium transition-all ${
                          selected
                            ? 'border-primary bg-primary/10 text-foreground'
                            : 'border-border bg-secondary/50 text-foreground hover:border-primary/50 hover:bg-secondary'
                        }`}
                      >
                        <span>{budget.label}</span>

                        <ArrowRight className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </button>
                    )
                  })}
              </div>
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-primary/40 bg-primary/5 p-8 text-center">

              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-6" />
              </span>

              <h3 className="mt-5 font-display text-2xl font-bold">
                Match found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                We&apos;ve shortlisted verified creators for a{' '}
                <span className="text-foreground">
                  {selectedService?.name.toLowerCase()}
                </span>{' '}
                in{' '}
                <span className="text-foreground">
                  {selectedLocation?.city}
                </span>{' '}
                within your{' '}
                <span className="text-foreground">
                  {selectedBudget?.label}
                </span>{' '}
                budget.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">

                <a
                  href={getResultsUrl()}
                  className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
                >
                  View matched creators
                </a>

                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Start over
                </button>

              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}