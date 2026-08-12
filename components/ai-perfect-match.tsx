'use client'

import { useState } from 'react'
import { Sparkles, ArrowLeft, ArrowRight, Check } from 'lucide-react'

type Step = {
  id: string
  question: string
  options: string[]
}

const steps: Step[] = [
  {
    id: 'capture',
    question: 'What are you capturing?',
    options: ['Luxury Wedding', 'Corporate Event', 'Commercial Ad', 'Birthday Shoot'],
  },
  {
    id: 'city',
    question: 'Where do you need the creator?',
    options: ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Anywhere in India'],
  },
  {
    id: 'budget',
    question: 'What is your budget range?',
    options: ['Under ₹50K', '₹50K – ₹1.5L', '₹1.5L – ₹5L', '₹5L & above'],
  },
]

export function AiPerfectMatch() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  const step = steps[current]
  const isLast = current === steps.length - 1

  function select(option: string) {
    const next = { ...answers, [step.id]: option }
    setAnswers(next)
    if (isLast) {
      setDone(true)
    } else {
      setCurrent((c) => c + 1)
    }
  }

  function back() {
    if (done) {
      setDone(true)
      return
    }
    setCurrent((c) => Math.max(0, c - 1))
  }

  function reset() {
    setAnswers({})
    setCurrent(0)
    setDone(false)
  }

  return (
    <section className="bg-background" aria-labelledby="ai-match-heading">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-8 shadow-2xl sm:p-12">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="ai-match-heading"
                className="flex items-center gap-3 font-display text-3xl font-bold tracking-tight sm:text-4xl"
              >
                <Sparkles className="size-7 fill-yellow-300 text-yellow-300" aria-hidden />
                AI Perfect Match
              </h2>
              <p className="mt-3 text-muted-foreground">
                Let our engine find your ideal visual creator.
              </p>
            </div>

            {/* Step dots */}
            <div className="mt-2 flex shrink-0 items-center gap-2" aria-hidden>
              {steps.map((s, i) => (
                <span
                  key={s.id}
                  className={`size-2.5 rounded-full transition-colors ${
                    done || i <= current ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Body */}
          {!done ? (
            <div className="mt-10">
              <div className="flex items-center gap-3">
                {current > 0 ? (
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ArrowLeft className="size-3.5" aria-hidden />
                    Back
                  </button>
                ) : null}
                <h3 className="text-lg font-semibold">{step.question}</h3>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {step.options.map((option) => {
                  const selected = answers[step.id] === option
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => select(option)}
                      className={`group flex items-center justify-between rounded-xl border px-5 py-4 text-left text-sm font-medium transition-all ${
                        selected
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-border bg-secondary/50 text-foreground hover:border-primary/50 hover:bg-secondary'
                      }`}
                    >
                      <span>{option}</span>
                      <ArrowRight className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-primary/40 bg-primary/5 p-8 text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold">Match found</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                We&apos;ve shortlisted verified creators for a{' '}
                <span className="text-foreground">{answers.capture?.toLowerCase()}</span> in{' '}
                <span className="text-foreground">{answers.city}</span> within your{' '}
                <span className="text-foreground">{answers.budget}</span> budget.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#creators"
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
