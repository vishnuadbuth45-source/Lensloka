'use client'

import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'

type Service = {
  id: string
  label: string
  /** Base price for the default 4 hours + 1 crew member */
  base: number
}

const SERVICES: Service[] = [
  { id: 'family', label: 'Family Events Coverage', base: 60000 },
  { id: 'corporate', label: 'Corporate Events', base: 85000 },
  { id: 'fashion', label: 'Fashion Shoots', base: 45000 },
  { id: 'product', label: 'Product Photography', base: 35000 },
  { id: 'birthday', label: 'Birthday Events', base: 25000 },
  { id: 'cinematic', label: 'Cinematic Productions', base: 120000 },
]

type AddOn = {
  id: string
  label: string
  icon: string
  price: number
}

const ADD_ONS: AddOn[] = [
  { id: 'drone', label: 'Drone Coverage', icon: '🚁', price: 15000 },
  { id: 'reels', label: 'Social Reels Package', icon: '🎬', price: 8000 },
]

const BASE_HOURS = 4
const BASE_CREW = 1

function formatINR(value: number) {
  return value.toLocaleString('en-IN')
}

export function BudgetEstimator() {
  const [serviceId, setServiceId] = useState<string>('family')
  const [hours, setHours] = useState<number>(BASE_HOURS)
  const [crew, setCrew] = useState<number>(BASE_CREW)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])

  const service = SERVICES.find((s) => s.id === serviceId)!

  const pricing = useMemo(() => {
    const extraHours = Math.max(0, hours - BASE_HOURS)
    const hoursCost = Math.round(service.base * 0.12) * extraHours

    const extraCrew = Math.max(0, crew - BASE_CREW)
    const crewCost = Math.round(service.base * 0.35) * extraCrew

    const addOnItems = ADD_ONS.filter((a) => selectedAddOns.includes(a.id))
    const addOnsCost = addOnItems.reduce((sum, a) => sum + a.price, 0)

    const total = service.base + hoursCost + crewCost + addOnsCost

    return { extraHours, hoursCost, extraCrew, crewCost, addOnItems, total }
  }, [service, hours, crew, selectedAddOns])

  function toggleAddOn(id: string) {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    )
  }

  return (
    <section
      id="budget-estimator"
      aria-labelledby="budget-heading"
      className="relative overflow-hidden bg-background py-20 lg:py-28"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <span className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Interactive Tool
          </span>
          <h2
            id="budget-heading"
            className="mt-6 font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Budget Estimator
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
            Get an instant ballpark for your shoot. Adjust and see live pricing.
          </p>
        </div>

        <div className="mt-14 rounded-3xl border border-border bg-card/60 p-5 shadow-2xl backdrop-blur sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
            {/* Controls */}
            <div>
              <fieldset>
                <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Service Type
                </legend>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {SERVICES.map((s) => {
                    const active = s.id === serviceId
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setServiceId(s.id)}
                        aria-pressed={active}
                        className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                          active
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
                        }`}
                      >
                        {s.label}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              {/* Coverage hours */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="coverage-hours"
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    Coverage Hours
                  </label>
                  <span className="text-sm font-bold text-foreground">{hours} HRS</span>
                </div>
                <input
                  id="coverage-hours"
                  type="range"
                  min={2}
                  max={12}
                  step={1}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="range-slider mt-4"
                />
              </div>

              {/* Crew */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="crew-count"
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    Photographers / Videographers
                  </label>
                  <span className="text-sm font-bold text-foreground">{crew}</span>
                </div>
                <input
                  id="crew-count"
                  type="range"
                  min={1}
                  max={6}
                  step={1}
                  value={crew}
                  onChange={(e) => setCrew(Number(e.target.value))}
                  className="range-slider mt-4"
                />
              </div>

              {/* Add-ons */}
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Add-Ons
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {ADD_ONS.map((a) => {
                    const checked = selectedAddOns.includes(a.id)
                    return (
                      <label
                        key={a.id}
                        className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3.5 text-sm transition-colors ${
                          checked
                            ? 'border-primary/60 bg-primary/10'
                            : 'border-border bg-secondary/50 hover:bg-secondary'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleAddOn(a.id)}
                            className="size-4 accent-primary"
                          />
                          <span aria-hidden="true">{a.icon}</span>
                          <span className="font-semibold text-foreground">{a.label}</span>
                        </span>
                        <span className="font-semibold text-primary">
                          +₹{formatINR(a.price)}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="flex flex-col rounded-2xl border border-border bg-background/60 p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Estimated Investment
              </p>
              <p className="mt-3 font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
                ₹{formatINR(pricing.total)}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Indicative range. Final quote after creator briefing.
              </p>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Base ({service.label})</dt>
                  <dd className="font-medium text-foreground">₹{formatINR(service.base)}</dd>
                </div>

                {pricing.hoursCost > 0 && (
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">
                      Extra coverage (+{pricing.extraHours} hrs)
                    </dt>
                    <dd className="font-medium text-foreground">
                      ₹{formatINR(pricing.hoursCost)}
                    </dd>
                  </div>
                )}

                {pricing.crewCost > 0 && (
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">
                      Additional crew (+{pricing.extraCrew})
                    </dt>
                    <dd className="font-medium text-foreground">
                      ₹{formatINR(pricing.crewCost)}
                    </dd>
                  </div>
                )}

                {pricing.addOnItems.map((a) => (
                  <div key={a.id} className="flex items-center justify-between">
                    <dt className="text-muted-foreground">{a.label}</dt>
                    <dd className="font-medium text-foreground">₹{formatINR(a.price)}</dd>
                  </div>
                ))}

                <div className="my-2 border-t border-border" />

                <div className="flex items-center justify-between">
                  <dt className="font-bold text-foreground">Total Estimate</dt>
                  <dd className="font-bold text-foreground">₹{formatINR(pricing.total)}</dd>
                </div>
              </dl>

              <button
                type="button"
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Find Creators in This Budget
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
