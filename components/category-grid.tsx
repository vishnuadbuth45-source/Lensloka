import {
  Users,
  Cake,
  Building2,
  Shirt,
  Package,
  Clapperboard,
  Plane,
  type LucideIcon,
} from 'lucide-react'

type Category = {
  icon: LucideIcon
  label: string
}

const categories: Category[] = [
  { icon: Users, label: 'Family Events Coverage' },
  { icon: Cake, label: 'Birthday Events' },
  { icon: Building2, label: 'Corporate Events' },
  { icon: Shirt, label: 'Fashion Shoots' },
  { icon: Package, label: 'Product Photography' },
  { icon: Clapperboard, label: 'Cinematic Productions' },
  { icon: Plane, label: 'Drone Coverage' },
]

export function CategoryGrid() {
  return (
    <section
      id="services"
      aria-labelledby="categories-heading"
      className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <h2
          id="categories-heading"
          className="font-display text-3xl font-semibold uppercase tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl"
        >
          What are you looking for today?
        </h2>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {categories.map((category) => (
            <li key={category.label}>
              <a
                href="#"
                className="group flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card/60 p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-card"
              >
                <span className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <category.icon className="size-7" strokeWidth={1.75} />
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {category.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
