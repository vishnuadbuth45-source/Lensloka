'use client'

type FooterLink = {
  label: string
  href: string
}

type FooterColumn = {
  title: string
  links: FooterLink[]
}

const footerColumns: FooterColumn[] = [
  {
    title: 'MARKETPLACE',
    links: [
      { label: 'Explore Creators', href: '/creators' },
      { label: 'Our Services', href: '/services' },
      { label: 'Trust & Safety', href: '#' },
      { label: 'Locations', href: '/locations' },
    ],
  },
  {
    title: 'FOR CREATORS',
    links: [
      { label: 'Join as Creator', href: '/join-creator' },
      { label: 'Creator Portal', href: '#' },
      { label: 'Verification Guide', href: '#' },
      { label: 'Creator Blog', href: '#' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
]

const socialLinks = [
  { icon: 'f', label: 'Facebook', href: '#' },
  { icon: '📷', label: 'Instagram', href: '#' },
  { icon: 'in', label: 'LinkedIn', href: '#' },
  { icon: '𝕏', label: 'Twitter', href: '#' },
]

const footerLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:gap-8 mb-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                LENS
              </span>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                LOKA
              </span>
            </div>
            <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
              The ultimate marketplace for visual production in India. Discover, compare, and book elite visual talent.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border bg-secondary/40 text-foreground transition-colors hover:bg-secondary text-sm font-semibold"
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Columns */}
          {footerColumns.map((column) => (
            <div key={column.title} className="lg:col-span-1">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-8 border-t border-border" />

        {/* Bottom Section */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2026 Lens Loka. All rights reserved.
          </p>

          {/* Footer Links */}
          <div className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
