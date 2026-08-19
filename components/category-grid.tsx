import {
  Users,
  Cake,
  Building2,
  Shirt,
  Package,
  Clapperboard,
  Plane,
  Camera,
  Video,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

import type { Service } from "@/lib/queries/creators"
type ServiceWithIcon = Service & {
  icon: LucideIcon
}

const serviceIcons: Record<string, LucideIcon> = {
  "family-events-coverage": Users,
  "birthday-events": Cake,
  "corporate-events": Building2,
  "fashion-shoots": Shirt,
  "product-photography": Package,
  "cinematic-productions": Clapperboard,
  "drone-coverage": Plane,
}
type CategoryGridProps = {
  services: Service[]
}

export function CategoryGrid({
  services,
}: CategoryGridProps) {
  const servicesWithIcons: ServiceWithIcon[] = services.map(
    (service) => ({
      ...service,
      icon: serviceIcons[service.slug] ?? Camera,
    })
  )

  return (
    <section
      id="services"
      aria-labelledby="categories-heading"
      className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">

        {/* Heading */}

        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Our Services
          </p>

          <h2
            id="categories-heading"
            className="font-display text-3xl font-semibold uppercase tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl"
          >
            What are you looking for today?
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Find the right creative professionals for your event,
            production, brand, or project.
          </p>
        </div>

        {/* Services */}

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">

          {servicesWithIcons.map((service) => {
            const Icon = service.icon

            return (
              <li key={service.id}>
                <a
                  href={`/creators/${service.slug}`}
                  className="group flex h-full min-h-[180px] flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card/60 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card hover:shadow-lg"
                >
                  <span className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
                    <Icon
                      className="size-7"
                      strokeWidth={1.75}
                    />
                  </span>

                  <span className="text-sm font-semibold leading-5 text-foreground transition-colors group-hover:text-primary">
                    {service.name}
                  </span>

                  <span className="text-xs text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Explore creators →
                  </span>
                </a>
              </li>
            )
          })}

        </ul>
      </div>
    </section>
  )
}