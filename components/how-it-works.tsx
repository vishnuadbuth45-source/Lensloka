'use client'

type Step = {
  number: string
  emoji: string
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: '01',
    emoji: '🔍',
    title: 'Describe Your Shoot',
    description: 'Tell us your event type, date, style, and budget. Takes 2 minutes.',
  },
  {
    number: '02',
    emoji: '✨',
    title: 'AI Matches You',
    description: 'Our engine surfaces the top verified creators that fit your brief.',
  },
  {
    number: '03',
    emoji: '🤝',
    title: 'Book with Escrow',
    description: 'Pay securely. Funds release to the creator only after you approve.',
  },
  {
    number: '04',
    emoji: '🎬',
    title: 'Receive & Review',
    description: 'Get your edited gallery/films. Rate your creator to help the community.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-background py-16 lg:py-24" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2
            id="how-it-works-heading"
            className="font-display text-4xl font-medium uppercase tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl"
          >
            How Lens Loka Works
          </h2>
          <p className="mt-4 text-base text-muted-foreground text-pretty">
            From idea to delivered memories in four simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Connector Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="absolute top-24 left-1/2 hidden h-px w-[calc(100vw/4-2rem)] bg-gradient-to-r from-border to-transparent lg:block" />
              )}

              {/* Step Card */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                {/* Step Number Badge */}
                <div className="flex items-center justify-center">
                  <span className="absolute inline-flex items-center justify-center size-10 rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {step.number}
                  </span>
                  {/* Emoji */}
                  <div className="relative size-20 flex items-center justify-center rounded-2xl border border-border bg-secondary/40 text-4xl">
                    {step.emoji}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-4">
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
