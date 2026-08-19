import Link from "next/link";
import { notFound } from "next/navigation";
import { getCreatorProfile } from "@/lib/queries/creators";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const creator = await getCreatorProfile(slug);

  if (!creator) {
    return {
      title: "Creator Not Found | Lens Loka",
    };
  }

  return {
    title: `${creator.name} | Lens Loka`,
    description:
      creator.bio ??
      `Discover ${creator.name} on Lens Loka.`,
  };
}

export default async function CreatorProfilePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const creator = await getCreatorProfile(slug);

  if (!creator) {
    notFound();
  }

  const primaryLocation =
    creator.locations.find((location) => location.isPrimary) ??
    creator.locations[0];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
          <Link
            href="/creators"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="text-lg">←</span>
            Back to creators
          </Link>
        </div>
      </header>

      {/* =====================================================
          PROFILE HERO
      ===================================================== */}
      <section className="relative overflow-hidden border-b border-border/60">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/3 top-0 h-[450px] w-[450px] rounded-full bg-[#7d287e]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
            {/* Profile image */}
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/70 bg-card">
                {creator.image ? (
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-secondary">
                    <span className="text-6xl font-semibold text-muted-foreground">
                      {creator.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Verified badge */}
              {creator.isVerified && (
                <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-background/90 px-3 py-2 text-xs font-semibold text-emerald-400 shadow-xl backdrop-blur-md">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[9px] text-black">
                    ✓
                  </span>
                  Verified Creator
                </div>
              )}
            </div>

            {/* Profile information */}
            <div className="flex flex-col justify-center">
              {/* Location */}
              {primaryLocation && (
                <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>📍</span>

                  <span>
                    {primaryLocation.city},{" "}
                    {primaryLocation.state}
                  </span>
                </div>
              )}

              {/* Name */}
              <h1 className="max-w-4xl font-display text-4xl font-medium uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
                {creator.name}
              </h1>

              {/* Stats */}
              <div className="mt-7 flex flex-wrap items-center gap-6">
                {creator.experienceYears !== null && (
                  <div>
                    <p className="text-2xl font-semibold">
                      {creator.experienceYears}+
                    </p>

                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Years experience
                    </p>
                  </div>
                )}

                <div className="h-10 w-px bg-border" />

                <div>
                  <p className="text-2xl font-semibold">
                    {creator.services.length}
                  </p>

                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Services
                  </p>
                </div>

                <div className="h-10 w-px bg-border" />

                <div>
                  <p className="text-2xl font-semibold">
                    {creator.locations.length}
                  </p>

                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Locations
                  </p>
                </div>
              </div>

              {/* Bio */}
              {creator.bio && (
                <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {creator.bio}
                </p>
              )}

              {/* Actions */}
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href={`/booking?creator=${creator.id}`}
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-85"
                >
                  Request Booking
                </Link>

                <a
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  View Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}
      <section
        id="services"
        className="border-b border-border/60 py-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              What they offer
            </p>

            <h2 className="font-display text-3xl font-medium uppercase tracking-tight sm:text-4xl lg:text-5xl">
              Services
            </h2>
          </div>

          {creator.services.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card/30 p-8 text-center text-muted-foreground">
              No services listed yet.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {creator.services.map((service) => (
                <div
                  key={service.id}
                  className="group rounded-2xl border border-border bg-card/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {service.name}
                      </h3>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {service.slug}
                      </p>
                    </div>

                    <span className="rounded-full bg-[#7d287e]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#c56ac6]">
                      Service
                    </span>
                  </div>

                  {(service.creatorDescription ||
                    service.description) && (
                    <p className="mt-5 text-sm leading-6 text-muted-foreground">
                      {service.creatorDescription ??
                        service.description}
                    </p>
                  )}

                  {(service.minPrice !== null ||
                    service.maxPrice !== null) && (
                    <div className="mt-6 border-t border-border/60 pt-5">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Starting price
                      </p>

                      <p className="mt-1 text-xl font-semibold">
                        {formatPriceRange(
                          service.minPrice,
                          service.maxPrice
                        )}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          LOCATIONS
      ===================================================== */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            {/* Heading */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Available locations
              </p>

              <h2 className="font-display text-3xl font-medium uppercase tracking-tight sm:text-4xl lg:text-5xl">
                Where they work
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
                Explore the cities and locations where this creator
                is currently available.
              </p>
            </div>

            {/* Locations */}
            <div className="grid gap-3 sm:grid-cols-2">
              {creator.locations.map((location) => (
                <Link
                  key={location.id}
                  href={`/creators?location=${encodeURIComponent(
                    location.city.toLowerCase()
                  )}`}
                  className="group rounded-2xl border border-border bg-card/30 p-5 transition-all duration-300 hover:border-primary/40 hover:bg-card/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">
                        {location.city}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {location.state}
                      </p>
                    </div>

                    {location.isPrimary && (
                      <span className="rounded-full border border-[#7d287e]/30 bg-[#7d287e]/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#c56ac6]">
                        Primary
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{location.country}</span>

                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}
      <section className="border-t border-border/60 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Ready to work together?
          </p>

          <h2 className="mt-4 font-display text-3xl font-medium uppercase tracking-tight sm:text-4xl lg:text-5xl">
            Work with {creator.name}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-foreground">
            Tell us what you&apos;re looking for and we&apos;ll help
            you connect with the right creator.
          </p>

          <Link
            href={`/booking?creator=${creator.id}`}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-85"
          >
            Request Booking →
          </Link>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function formatPriceRange(
  minPrice: number | null,
  maxPrice: number | null
) {
  const format = (value: number) =>
    `₹${value.toLocaleString("en-IN")}`;

  if (minPrice !== null && maxPrice !== null) {
    return `${format(minPrice)} – ${format(maxPrice)}`;
  }

  if (minPrice !== null) {
    return `From ${format(minPrice)}`;
  }

  if (maxPrice !== null) {
    return `Up to ${format(maxPrice)}`;
  }

  return "Contact for pricing";
}