'use client'

import { useState } from 'react'
import { Camera, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Creators', href: '/creators' },
  { label: 'Locations', href: '/locations' },
  { label: 'Join as Creator', href: '/join-creator' },
]

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2" aria-label="LENS LOKA home">
      <span className="font-display text-lg font-bold leading-[0.85] tracking-[0.18em] text-foreground">
        LENS
        <span className="flex items-center gap-1">
          L
          <Camera className="size-3.5 text-foreground/90" aria-hidden="true" />
          KA
        </span>
      </span>
    </a>
  )
}

function LanguageToggle() {
  const [lang, setLang] = useState<'EN' | 'AR'>('EN')
  return (
    <div className="flex items-center rounded-full bg-white/5 p-0.5 ring-1 ring-white/10">
      <button
        type="button"
        onClick={() => setLang('EN')}
        aria-pressed={lang === 'EN'}
        className={cn(
          'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
          lang === 'EN'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('AR')}
        aria-pressed={lang === 'AR'}
        className={cn(
          'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
          lang === 'AR'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        ع
      </button>
    </div>
  )
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 lg:px-12">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground/90 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <button
            type="button"
            className="hidden rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white/10 sm:inline-flex"
          >
            Sign In
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground lg:hidden"
          >
            {mobileOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="mx-4 rounded-2xl border border-white/10 bg-card/95 p-5 backdrop-blur lg:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-foreground/90"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center justify-between pt-2">
              <LanguageToggle />
              <button
                type="button"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-foreground"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
