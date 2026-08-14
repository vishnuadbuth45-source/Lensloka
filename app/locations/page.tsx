"use client";

import Link from "next/link";
import { useState } from "react";

type Location = {
  id: string;
  city: string;
  state: string;
  creatorCount: number;
  topCategory: string;
  status: "VERIFIED" | "COMING SOON";
  x: number;
  y: number;
};

const locations: Location[] = [
  {
    id: "mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    creatorCount: 210,
    topCategory: "Fashion Shoots",
    status: "VERIFIED",
    x: 16.06,
    y: 59.37,
  },
  {
    id: "pune",
    city: "Pune",
    state: "Maharashtra",
    creatorCount: 92,
    topCategory: "Product Photography",
    status: "VERIFIED",
    x: 19.40,
    y: 61.20,
  },
  {
    id: "bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    creatorCount: 165,
    topCategory: "Corporate Events",
    status: "VERIFIED",
    x: 32.19,
    y: 79.50,
  },
  {
    id: "hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    creatorCount: 140,
    topCategory: "Family Events Coverage",
    status: "VERIFIED",
    x: 35.24,
    y: 64.95,
  },
  {
    id: "chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    creatorCount: 98,
    topCategory: "Cinematic Productions",
    status: "VERIFIED",
    x: 41.34,
    y: 79.13,
  },
  {
    id: "vijayawada",
    city: "Vijayawada",
    state: "Andhra Pradesh",
    creatorCount: 76,
    topCategory: "Birthday Events",
    status: "VERIFIED",
    x: 42.64,
    y: 67.85,
  },
  {
    id: "rajahmundry",
    city: "Rajahmundry",
    state: "Andhra Pradesh",
    creatorCount: 54,
    topCategory: "Family Events",
    status: "VERIFIED",
    x: 46.48,
    y: 66.22,
  },
  {
    id: "visakhapatnam",
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    creatorCount: 87,
    topCategory: "Wedding Photography",
    status: "VERIFIED",
    x: 51.43,
    y: 63.95,
  },
];

export default function LocationsPage() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  const activeCity = locations.find(
    (location) => location.id === activeLocation
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden border-b border-border/60">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-180px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#7d287e]/10 blur-[120px]" />
          <div className="absolute bottom-[-200px] left-[-100px] h-[400px] w-[400px] rounded-full bg-[#7d287e]/5 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          {/* Back */}
          <Link
            href="/"
            className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back
          </Link>

          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Our Locations
              </span>
            </div>

            <h1 className="font-display text-4xl font-medium uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
              Discover talent
              <br />
              <span className="text-muted-foreground">
                near you.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Discover verified creators across India&apos;s growing creative
              hubs — from photographers and filmmakers to event specialists
              and visual storytellers.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAP
      ========================================================= */}
      <section className="border-b border-border/60 py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/30 shadow-2xl">
            {/* Map header */}
            <div className="relative z-10 flex flex-col gap-5 border-b border-border/60 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Creator network
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Explore our active locations across India.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute h-3 w-3 animate-ping rounded-full bg-emerald-400/40" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Live locations
              </div>
            </div>

            {/* Map background */}
            <div className="relative min-h-[520px] overflow-hidden px-4 py-10 sm:min-h-[650px] sm:px-10 lg:min-h-[760px]">
              {/* Grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />

              {/* Center glow */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7d287e]/10 blur-[120px]" />

              {/* India map */}
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[700px]">
                <div
  className="absolute inset-0 bg-[#9d5fa3]/70"
  style={{
    WebkitMaskImage: "url('/india.svg')",
    maskImage: "url('/india.svg')",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  }}
/>

                {/* City pins */}
                {locations.map((location) => {
                  const isActive = activeLocation === location.id;

                  return (
                    <button
                      key={location.id}
                      type="button"
                      onClick={() =>
                        setActiveLocation(
                          isActive ? null : location.id
                        )
                      }
                      onMouseEnter={() =>
                        setActiveLocation(location.id)
                      }
                      onMouseLeave={() =>
                        setActiveLocation(null)
                      }
                      className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
                      style={{
                        left: `${location.x}%`,
                        top: `${location.y}%`,
                      }}
                      aria-label={`View ${location.city}`}
                    >
                      {/* Pulse */}
                      <span
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c56ac6]/30 transition-all duration-500 ${
                          isActive
                            ? "h-12 w-12"
                            : "h-8 w-8 animate-pulse"
                        }`}
                      />

                      {/* Pin */}
                      <span
                        className={`relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-[#c56ac6] shadow-[0_0_20px_rgba(197,106,198,0.7)] transition-all duration-300 ${
                          isActive
                            ? "scale-125"
                            : "scale-100"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      </span>

                      {/* City label */}
                      <span
                        className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border/70 bg-background/90 px-2.5 py-1 text-[10px] font-semibold shadow-lg backdrop-blur-md transition-all duration-300 ${
                          isActive
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-80 sm:opacity-0"
                        }`}
                      >
                        {location.city}
                      </span>
                    </button>
                  );
                })}

                {/* Active location card */}
                {activeCity && (
                  <div className="absolute bottom-4 left-1/2 z-20 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 sm:bottom-6">
                    <div className="rounded-2xl border border-border/70 bg-background/90 p-4 shadow-2xl backdrop-blur-xl">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold">
                            {activeCity.city}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {activeCity.state}
                          </p>
                        </div>

                        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-emerald-400">
                          {activeCity.status}
                        </span>
                      </div>

                      <div className="mt-4 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-2xl font-semibold">
                            {activeCity.creatorCount}+
                          </p>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            Creators
                          </p>
                        </div>

                        <Link
                          href={`/creators?location=${encodeURIComponent(
                            activeCity.city.toLowerCase()
                          )}`}
                          className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-80"
                        >
                          Explore →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Decorative corners */}
              <div className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l border-t border-border/50" />
              <div className="pointer-events-none absolute right-5 top-5 h-8 w-8 border-r border-t border-border/50" />
              <div className="pointer-events-none absolute bottom-5 left-5 h-8 w-8 border-b border-l border-border/50" />
              <div className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b border-r border-border/50" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          LIVE NOW
      ========================================================= */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Available now
                </span>
              </div>

              <h2 className="font-display text-4xl font-medium uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
                Live Now
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-muted-foreground sm:text-right">
              Explore verified creators and production talent available in
              each of our active locations.
            </p>
          </div>

          {/* Location cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((location) => (
              <div
                key={location.id}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#7d287e]/50 hover:bg-card/60 hover:shadow-xl"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#7d287e]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Header */}
                <div className="relative mb-8 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {location.city}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {location.state}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[9px] font-bold tracking-[0.08em] text-emerald-400">
                    {location.status}
                  </span>
                </div>

                {/* Stats */}
                <div className="relative space-y-5">
                  <div>
                    <p className="text-3xl font-semibold tracking-tight">
                      {location.creatorCount}+
                    </p>
                    <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Creators
                    </p>
                  </div>

                  <div className="border-t border-border/60 pt-5">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Top category
                    </p>

                    <p className="mt-1.5 text-sm font-medium text-foreground">
                      {location.topCategory}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/creators?location=${encodeURIComponent(
                    location.city.toLowerCase()
                  )}`}
                  className="relative mt-7 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2.5 text-xs font-semibold transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  Explore {location.city}
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}