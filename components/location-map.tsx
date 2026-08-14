"use client";

import Link from "next/link";
import { useState } from "react";

type Location = {
  id: string;
  name: string;
  status: "Verified" | "Coming Soon";
  x: number;
  y: number;
};

const locations: Location[] = [
  {
    id: "1",
    name: "Hyderabad",
    status: "Verified",
    x: 35.24,
    y: 64.95,
  },
  {
    id: "2",
    name: "Vijayawada",
    status: "Verified",
    x: 42.64,
    y: 67.85,
  },
  {
    id: "3",
    name: "Visakhapatnam",
    status: "Verified",
    x: 51.43,
    y: 63.95,
  },
  {
    id: "4",
    name: "Rajahmundry",
    status: "Verified",
    x: 46.48,
    y: 66.22,
  },
  {
    id: "5",
    name: "Bengaluru",
    status: "Verified",
    x: 32.19,
    y: 79.5,
  },
  {
    id: "6",
    name: "Chennai",
    status: "Verified",
    x: 41.34,
    y: 79.13,
  },
  {
    id: "7",
    name: "Nellore",
    status: "Verified",
    x: 43.5,
    y: 74.2,
  },
  {
    id: "8",
    name: "Guntur",
    status: "Verified",
    x: 43.2,
    y: 69.1,
  },
];

export function LocationMap() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  return (
    <section
      id="locations"
      className="relative overflow-hidden border-b border-border/60 bg-background py-16 sm:py-20 lg:py-28"
      aria-labelledby="locations-heading"
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#7d287e]/[0.06] blur-[120px]" />

        <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-[#c56ac6]/[0.04] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="mb-12 max-w-3xl lg:mb-16">
          <div className="mb-5 inline-flex rounded-full border border-border bg-secondary/40 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Explore by region
            </span>
          </div>

          <h2
            id="locations-heading"
            className="font-display text-4xl font-medium uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-7xl"
          >
            Discover talent
            <br />
            <span className="text-muted-foreground">
              near you.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Navigate our network to discover top-tier visual creators
            across India&apos;s growing creative hubs.
          </p>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* ===================================================
              LOCATIONS LIST
          =================================================== */}
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {locations.map((location) => {
                const isActive = activeLocation === location.id;

                return (
                  <Link
                    key={location.id}
                    href={`/creators?location=${encodeURIComponent(
                      location.name.toLowerCase()
                    )}`}
                    onMouseEnter={() =>
                      setActiveLocation(location.id)
                    }
                    onMouseLeave={() =>
                      setActiveLocation(null)
                    }
                    onFocus={() =>
                      setActiveLocation(location.id)
                    }
                    onBlur={() =>
                      setActiveLocation(null)
                    }
                    className={`group relative flex items-center justify-between overflow-hidden rounded-xl border px-5 py-4 backdrop-blur-sm transition-all duration-300 ${
                      isActive
                        ? "border-[#7d287e]/60 bg-card/70 shadow-lg shadow-[#7d287e]/10"
                        : "border-border bg-card/30 hover:border-primary/40 hover:bg-card/60"
                    }`}
                  >
                    {/* Active glow */}
                    <span
                      className={`pointer-events-none absolute left-0 top-0 h-full w-1 bg-[#c56ac6] transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    <div className="flex items-center gap-3">
                      {/* Status dot */}
                      <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                        <span
                          className={`absolute h-full w-full rounded-full bg-emerald-400/30 ${
                            isActive ? "animate-ping" : ""
                          }`}
                        />

                        <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>

                      <h3
                        className={`text-base font-semibold transition-colors ${
                          isActive
                            ? "text-[#c56ac6]"
                            : "text-foreground"
                        }`}
                      >
                        {location.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                        {location.status}
                      </span>

                      <span
                        className={`text-muted-foreground transition-transform duration-300 ${
                          isActive
                            ? "translate-x-0.5"
                            : "translate-x-0"
                        }`}
                      >
                        →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* View all */}
            <Link
              href="/locations"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-foreground/30 hover:bg-secondary sm:w-auto"
            >
              View all locations
              <span>→</span>
            </Link>
          </div>

          {/* ===================================================
              MAP
          =================================================== */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/20 p-5 shadow-2xl backdrop-blur-sm sm:p-8">
              {/* Map header */}
              <div className="relative z-20 mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    Our network
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Active creative hubs
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400/50" />
                    <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                  </span>

                  <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Live
                  </span>
                </div>
              </div>

              {/* Map container */}
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[560px]">
                {/* Ambient map glow */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7d287e]/10 blur-[90px]" />

                {/* Subtle grid */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.025]"
                  style={{
                    backgroundImage:
                      "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />

                {/* =================================================
                    ACTUAL INDIA SVG
                ================================================= */}
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

                {/* =================================================
                    CITY PINS
                ================================================= */}
                {locations.map((location) => {
                  const isActive =
                    activeLocation === location.id;

                  return (
                    <Link
                      key={location.id}
                      href={`/creators?location=${encodeURIComponent(
                        location.name.toLowerCase()
                      )}`}
                      aria-label={`Explore creators in ${location.name}`}
                      onMouseEnter={() =>
                        setActiveLocation(location.id)
                      }
                      onMouseLeave={() =>
                        setActiveLocation(null)
                      }
                      onFocus={() =>
                        setActiveLocation(location.id)
                      }
                      onBlur={() =>
                        setActiveLocation(null)
                      }
                      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 outline-none"
                      style={{
                        left: `${location.x}%`,
                        top: `${location.y}%`,
                      }}
                    >
                      {/* Pulse */}
                      <span
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c56ac6]/30 transition-all duration-300 ${
                          isActive
                            ? "h-10 w-10"
                            : "h-7 w-7 animate-pulse"
                        }`}
                      />

                      {/* Pin */}
                      <span
                        className={`relative flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-background bg-[#c56ac6] shadow-[0_0_18px_rgba(197,106,198,0.8)] transition-transform duration-300 ${
                          isActive
                            ? "scale-125"
                            : "scale-100"
                        }`}
                      >
                        <span className="h-1 w-1 rounded-full bg-white" />
                      </span>

                      {/* Label */}
                      <span
                        className={`pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-border/60 bg-background/90 px-2 py-1 text-[8px] font-semibold shadow-lg backdrop-blur-md transition-all duration-200 ${
                          isActive
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-0"
                        }`}
                      >
                        {location.name}
                      </span>
                    </Link>
                  );
                })}

                {/* Decorative frame */}
                <div className="pointer-events-none absolute left-2 top-2 h-6 w-6 border-l border-t border-border/40" />

                <div className="pointer-events-none absolute right-2 top-2 h-6 w-6 border-r border-t border-border/40" />

                <div className="pointer-events-none absolute bottom-2 left-2 h-6 w-6 border-b border-l border-border/40" />

                <div className="pointer-events-none absolute bottom-2 right-2 h-6 w-6 border-b border-r border-border/40" />
              </div>

              {/* Bottom stat */}
              <div className="relative mt-3 flex items-center justify-between border-t border-border/50 pt-4">
                <p className="text-xs text-muted-foreground">
                  Growing across India
                </p>

                <Link
                  href="/locations"
                  className="text-xs font-semibold text-foreground transition-colors hover:text-[#c56ac6]"
                >
                  Explore all →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}