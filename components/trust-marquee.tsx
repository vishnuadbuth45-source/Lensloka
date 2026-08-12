import {
  Sparkles,
  MapPin,
  Trophy,
  BadgeCheck,
  Star,
  ShieldCheck,
  Zap,
} from 'lucide-react'

const items = [
  { icon: Sparkles, label: 'Quality Assured' },
  { icon: MapPin, label: 'Pan-India Network' },
  { icon: Trophy, label: '500+ Elite Creators' },
  { icon: BadgeCheck, label: 'Verified Creators' },
  { icon: Star, label: 'Real Client Reviews' },
  { icon: ShieldCheck, label: 'Escrow Protection' },
  { icon: Zap, label: 'Fast Response Times' },
]

function MarqueeGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((item, i) => (
        <div
          key={`${item.label}-${i}`}
          className="flex items-center gap-2.5 whitespace-nowrap px-8 py-4"
        >
          <item.icon className="size-4 text-primary" strokeWidth={2} />
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/80">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export function TrustMarquee() {
  return (
    <section
      className="marquee-track relative overflow-hidden border-y border-border bg-background"
      aria-label="Platform highlights"
    >
      <div className="flex w-max animate-marquee">
        <MarqueeGroup />
        <MarqueeGroup ariaHidden />
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </section>
  )
}
