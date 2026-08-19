"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { useMemo, useState } from "react"

import type {
  Creator,
  Location,
} from "@/lib/queries/creators"

type LocationCreatorsContentProps = {
  location: Location
  creators: Creator[]
}

export function LocationCreatorsContent({
  location,
  creators,
}: LocationCreatorsContentProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCreators = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    if (!term) {
      return creators
    }

    return creators.filter((creator) => {
      const matchesCreator =
        creator.name.toLowerCase().includes(term) ||
        creator.bio?.toLowerCase().includes(term)

      const matchesService = creator.services.some(
        (service) =>
          service.name.toLowerCase().includes(term) ||
          service.slug.toLowerCase().includes(term)
      )

      return matchesCreator || matchesService
    })
  }, [creators, searchTerm])

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* HERO */}

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">

          <Link
            href="/locations"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to locations
          </Link>

          <div className="max-w-4xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {location.status}
              </span>
            </div>

            <h1 className="font-display text-5xl font-medium uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Creators in{" "}
              <span className="text-muted-foreground">
                {location.city}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Discover verified photographers, videographers,
              cinematographers and creative professionals available
              in {location.city}
              {location.state ? `, ${location.state}` : ""}.
            </p>

            <div className="mt-8 flex flex-wrap gap-6">

              <div>
                <p className="text-3xl font-semibold">
                  {location.creatorCount}+
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Creators
                </p>
              </div>

              <div className="h-12 w-px bg-border" />

              <div>
                <p className="text-lg font-medium">
                  {location.city}
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {location.state}
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}

      <section className="border-b border-border/60 py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

            <input
              type="text"
              placeholder="Search creators or services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-border bg-card/40 py-3 pl-12 pr-6 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

        </div>
      </section>

      {/* CREATORS */}

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing {filteredCreators.length} creator
              {filteredCreators.length !== 1 ? "s" : ""} in{" "}
              {location.city}
            </p>
          </div>

          {filteredCreators.length > 0 ? (

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

              {filteredCreators.map((creator) => (

                <div
                  key={creator.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/40 transition-colors hover:border-primary/50"
                >

                  {/* IMAGE */}

                  <div className="aspect-square overflow-hidden bg-primary/10">

                    {creator.image ? (
                      <img
                        src={creator.image}
                        alt={creator.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-7xl">
                        📸
                      </div>
                    )}

                  </div>

                  {/* CONTENT */}

                  <div className="flex flex-grow flex-col p-6">

                    {creator.isVerified && (
                      <div className="mb-3">
                        <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                          ✓ VERIFIED
                        </span>
                      </div>
                    )}

                    <h3 className="mb-1 text-lg font-semibold group-hover:text-primary">
                      {creator.name}
                    </h3>

                    {creator.experienceYears !== null && (
                      <p className="mb-4 text-sm text-muted-foreground">
                        {creator.experienceYears}+ years experience
                      </p>
                    )}

                    {/* SERVICES */}

                    <div className="mb-6 flex-grow space-y-3">

                      {creator.services.slice(0, 3).map((service) => (

                        <div
                          key={service.id}
                          className="rounded-xl border border-border/60 bg-background/40 p-3"
                        >

                          <p className="text-sm font-medium">
                            {service.name}
                          </p>

                          {(service.minPrice !== null ||
                            service.maxPrice !== null) && (
                            <p className="mt-2 text-sm font-semibold text-primary">
                              ₹
                              {service.minPrice?.toLocaleString("en-IN")}

                              {service.maxPrice
                                ? ` - ₹${service.maxPrice.toLocaleString(
                                    "en-IN"
                                  )}`
                                : "+"}
                            </p>
                          )}

                        </div>

                      ))}

                    </div>

                    <Link
                      href={`/creators/profile/${creator.id}`}
                      className="w-full rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      View Creator
                    </Link>

                  </div>
                </div>

              ))}

            </div>

          ) : (

            <div className="py-20 text-center">

              <p className="text-lg font-medium">
                No creators found
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                We couldn't find creators matching "{searchTerm}" in{" "}
                {location.city}.
              </p>

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-6 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary"
                >
                  Clear Search
                </button>
              )}

            </div>

          )}

        </div>
      </section>

    </main>
  )
}