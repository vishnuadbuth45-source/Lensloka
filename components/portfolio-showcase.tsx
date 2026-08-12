import Image from 'next/image'

type PortfolioItem = {
  title: string
  subtitle: string
  image: string
  featured?: boolean
  className: string
}

const items: PortfolioItem[] = [
  {
    title: 'Family Events Coverage',
    subtitle: 'Weddings • Anniversaries • Family Celebrations',
    image: '/portfolio/family-events.png',
    featured: true,
    className: 'lg:col-span-2 lg:row-span-2',
  },
  {
    title: 'Fashion Shoots',
    subtitle: 'Editorial • Stylized',
    image: '/carousel/shot-2.png',
    className: 'lg:col-span-1',
  },
  {
    title: 'Cinematic Productions',
    subtitle: 'Filmmaking • Commercials',
    image: '/portfolio/cinematic.png',
    className: 'lg:col-span-1',
  },
  {
    title: 'Corporate Events',
    subtitle: 'Conferences • Brand Events',
    image: '/portfolio/corporate.png',
    className: 'lg:col-span-2',
  },
]

export function PortfolioShowcase() {
  return (
    <section
      id="creators"
      aria-labelledby="portfolio-heading"
      className="bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2
              id="portfolio-heading"
              className="font-display text-4xl font-medium uppercase tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl"
            >
              Discover creative excellence
            </h2>
            <p className="mt-4 text-base text-muted-foreground text-pretty">
              Browse world-class portfolios from verified creators across India.
            </p>
          </div>
          <a
            href="#creators"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            View All Portfolios
          </a>
        </div>

        {/* Bento grid */}
        <div className="mt-10 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 sm:grid-cols-2 lg:h-[680px] lg:grid-cols-4 lg:grid-rows-2">
          {items.map((item) => (
            <a
              key={item.title}
              href="#creators"
              className={`group relative isolate flex min-h-64 items-end overflow-hidden rounded-2xl border border-border lg:min-h-0 ${item.className}`}
            >
              <Image
                src={item.image || '/placeholder.svg'}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Content */}
              <div className="relative z-10 p-6">
                {item.featured ? (
                  <span className="mb-3 inline-flex rounded-md bg-primary px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                    Featured
                  </span>
                ) : null}
                <h3 className="text-xl font-semibold text-white text-balance">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-white/70">{item.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
