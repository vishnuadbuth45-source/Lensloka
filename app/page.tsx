import { HeroCarousel } from '@/components/hero-carousel'
import { TrustMarquee } from '@/components/trust-marquee'
import { StatsRow } from '@/components/stats-row'
import { CategoryGrid } from '@/components/category-grid'
import { PortfolioShowcase } from '@/components/portfolio-showcase'
import { CompareCreators } from '@/components/compare-creators'
import { AiPerfectMatchWrapper } from '@/components/ai-perfect-match-wrapper'
import { BudgetEstimator } from '@/components/budget-estimator'
import { HowItWorks } from '@/components/how-it-works'
import { TrustVerification } from '@/components/trust-verification'
import { ClientsTestimonials } from '@/components/clients-testimonials'
import { CreatorCTA } from '@/components/creator-cta'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { LocationMapSection } from '@/components/location-map-section'
import { getServices } from "@/lib/queries/creators"

export default async function Page() {
  const services = await getServices()
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <HeroCarousel />
      <TrustMarquee />
      <StatsRow />
      <CategoryGrid services={services} />
      <PortfolioShowcase />
      <CompareCreators />
      <AiPerfectMatchWrapper />
      <BudgetEstimator />
      <HowItWorks />
      <LocationMapSection />
      <TrustVerification />
      <ClientsTestimonials />
      <CreatorCTA />
      <WhatsAppButton />
    </main>
  )
}
