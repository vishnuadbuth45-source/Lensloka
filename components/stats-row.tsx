import { Star } from 'lucide-react'

const stats = [
  { value: '500+', label: 'Verified Creators' },
  { value: '12K+', label: 'Events Delivered' },
  { value: '4.9', label: 'Average Rating', star: true },
  { value: '28', label: 'Cities & Growing' },
]

export function StatsRow() {
  return (
    <section className="border-b border-border bg-background" aria-label="Key statistics">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <dl className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="flex items-center gap-1 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {stat.value}
                {stat.star ? (
                  <Star className="size-7 fill-foreground text-foreground sm:size-9" />
                ) : null}
              </dd>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
