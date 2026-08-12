import { HeroCarousel } from '@/components/hero-carousel'
import { TrustMarquee } from '@/components/trust-marquee'
import { StatsRow } from '@/components/stats-row'
import { CategoryGrid } from '@/components/category-grid'
import { PortfolioShowcase } from '@/components/portfolio-showcase'
import { CompareCreators } from '@/components/compare-creators'
import { AiPerfectMatch } from '@/components/ai-perfect-match'
import { BudgetEstimator } from '@/components/budget-estimator'
import { HowItWorks } from '@/components/how-it-works'
import { LocationMap } from '@/components/location-map'
import { TrustVerification } from '@/components/trust-verification'
import { ClientsTestimonials } from '@/components/clients-testimonials'
import { CreatorCTA } from '@/components/creator-cta'
import { WhatsAppButton } from '@/components/whatsapp-button'

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <HeroCarousel />
      <TrustMarquee />
      <StatsRow />
      <CategoryGrid />
      <PortfolioShowcase />
      <CompareCreators />
      <AiPerfectMatch />
      <BudgetEstimator />
      <HowItWorks />
      <LocationMap />
      <TrustVerification />
      <ClientsTestimonials />
      <CreatorCTA />
      <WhatsAppButton />
    </main>
  )
}
