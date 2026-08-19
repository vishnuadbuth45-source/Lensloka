"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Star, Search } from "lucide-react"
import { useMemo, useState } from "react"
import type { Creator } from "@/lib/queries/creators"

type CreatorsContentProps = {
  creators: Creator[],
  selectedService?: string | null
}

export function CreatorsContent({
  creators,
}: CreatorsContentProps) {
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") ?? ""
  )

  const filteredCreators = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    if (!term) {
      return creators
    }

    return creators.filter((creator) => {
      /* ------------------------------------------
         CREATOR SEARCH
         ------------------------------------------ */

      const matchesCreator =
        creator.name.toLowerCase().includes(term) ||
        creator.bio?.toLowerCase().includes(term)

      /* ------------------------------------------
         SERVICE SEARCH
         ------------------------------------------ */

      const matchesService = creator.services.some((service) =>
        service.name.toLowerCase().includes(term) ||
        service.slug.toLowerCase().includes(term) ||
        service.description?.toLowerCase().includes(term)
      )

      /* ------------------------------------------
         LOCATION SEARCH
         ------------------------------------------ */

      const matchesLocation = creator.locations.some((location) =>
        location.name.toLowerCase().includes(term) ||
        location.city.toLowerCase().includes(term) ||
        location.state.toLowerCase().includes(term) ||
        location.country.toLowerCase().includes(term)
      )

      return (
        matchesCreator ||
        matchesService ||
        matchesLocation
      )
    })
  }, [creators, searchTerm])

  return (
    <main className="relative bg-background text-foreground">

      {/* ==================================================
          HEADER
          ================================================== */}

      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">

            <div className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Find Your Creator
              </span>
            </div>

            <h1 className="font-display text-4xl font-medium uppercase tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl mb-6">
              World-Class Creators
            </h1>

            <p className="mx-auto max-w-2xl text-base text-muted-foreground text-pretty">
              Browse and compare talented photographers, videographers,
              cinematographers, and creative professionals from LensLoka.
            </p>

          </div>
        </div>
      </section>


      {/* ==================================================
          SEARCH
          ================================================== */}

      <section className="py-12 lg:py-16 border-b border-border">
        <div className="mx-auto max-w-4xl px-6">

          <div className="relative">

            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />

            <input
              type="text"
              placeholder="Search by creator, service, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-border bg-card/40 pl-12 pr-6 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />

          </div>

        </div>
      </section>


      {/* ==================================================
          CREATOR GRID
          ================================================== */}

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">

          {filteredCreators.length > 0 ? (
            <>

              {/* Result count */}

              <div className="mb-8">
                <p className="text-muted-foreground">
                  Showing{" "}
                  {filteredCreators.length} creator
                  {filteredCreators.length !== 1 ? "s" : ""}
                </p>
              </div>


              {/* Grid */}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {filteredCreators.map((creator) => (

                  <div
                    key={creator.id}
                    className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-colors group flex flex-col"
                  >

                    {/* ==========================================
                        IMAGE
                        ========================================== */}

                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">

                      {creator.image ? (
                        <img
                          src={creator.image}
                          alt={creator.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-7xl">
                          📸
                        </div>
                      )}

                    </div>


                    {/* ==========================================
                        CONTENT
                        ========================================== */}

                    <div className="p-6 flex flex-col flex-grow">


                      {/* Verification */}

                      {creator.isVerified && (
                        <div className="mb-3">

                          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                            ✓ VERIFIED
                          </span>

                        </div>
                      )}


                      {/* Name */}

                      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {creator.name}
                      </h3>


                      {/* Experience */}

                      {creator.experienceYears !== null && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {creator.experienceYears}+ years experience
                        </p>
                      )}


                      {/* Rating */}

                      <div className="flex items-center gap-1 mb-4">

                        <Star className="w-4 h-4 fill-current text-primary" />

                        <span className="text-sm font-semibold">
                          {Number(creator.rating).toFixed(1)}
                        </span>

                        <span className="text-sm text-muted-foreground">
                          ({creator.reviewCount}{" "}
                          {creator.reviewCount === 1
                            ? "review"
                            : "reviews"}
                          )
                        </span>

                      </div>


                      {/* ==========================================
                          SERVICES
                          ========================================== */}

                      <div className="space-y-3 mb-6 flex-grow">

                        {creator.services
                          .slice(0, 3)
                          .map((service) => (

                            <div
                              key={service.id}
                              className="rounded-xl border border-border/60 bg-background/40 p-3"
                            >

                              <div className="flex items-start justify-between gap-2 mb-1">

                                <span className="text-sm font-medium text-foreground">
                                  {service.name}
                                </span>

                              </div>


                              {/* Service description */}

                              {service.description && (
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {service.description}
                                </p>
                              )}


                              {/* Price */}

                              {(service.minPrice !== null ||
                                service.maxPrice !== null) && (

                                <p className="text-sm font-semibold text-primary mt-2">

                                  {service.minPrice !== null && (
                                    <>
                                      ₹
                                      {service.minPrice.toLocaleString(
                                        "en-IN"
                                      )}
                                    </>
                                  )}

                                  {service.minPrice !== null &&
                                    service.maxPrice !== null &&
                                    " - "}

                                  {service.maxPrice !== null && (
                                    <>
                                      ₹
                                      {service.maxPrice.toLocaleString(
                                        "en-IN"
                                      )}
                                    </>
                                  )}

                                  {service.minPrice === null &&
                                    service.maxPrice !== null &&
                                    "+"}

                                </p>

                              )}

                            </div>

                          ))}


                        {/* More services */}

                        {creator.services.length > 3 && (
                          <p className="text-xs text-muted-foreground">
                            +
                            {creator.services.length - 3} more services
                          </p>
                        )}

                      </div>


                      {/* ==========================================
                          LOCATIONS
                          ========================================== */}

                      {creator.locations.length > 0 && (

                        <div className="mb-6">

                          <p className="text-xs font-medium text-muted-foreground mb-2">
                            SERVES
                          </p>

                          <div className="flex flex-wrap gap-1.5">

                            {creator.locations
                              .slice(0, 3)
                              .map((location) => (

                                <span
                                  key={location.id}
                                  className="rounded-full border border-border/60 bg-background/40 px-2.5 py-1 text-xs text-muted-foreground"
                                >
                                  📍 {location.city}
                                </span>

                              ))}

                            {creator.locations.length > 3 && (
                              <span className="rounded-full border border-border/60 bg-background/40 px-2.5 py-1 text-xs text-muted-foreground">
                                +{creator.locations.length - 3}
                              </span>
                            )}

                          </div>

                        </div>

                      )}


                      {/* ==========================================
                          CTA
                          ========================================== */}

                      <Link
                        href={`/creators/profile/${creator.id}`}
                        className="w-full rounded-full bg-primary hover:bg-primary/90 px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors text-center"
                      >
                        View Creator
                      </Link>

                    </div>

                  </div>

                ))}

              </div>

            </>
          ) : (

            /* ================================================
               NO RESULTS
               ================================================ */

            <div className="text-center py-16">

              <p className="text-muted-foreground mb-4">
                No creators found matching "{searchTerm}"
              </p>

              <button
                onClick={() => setSearchTerm("")}
                className="inline-flex items-center justify-center rounded-full border border-border bg-secondary/40 hover:bg-secondary/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors"
              >
                Clear Search
              </button>

            </div>

          )}

        </div>
      </section>

    </main>
  )
}