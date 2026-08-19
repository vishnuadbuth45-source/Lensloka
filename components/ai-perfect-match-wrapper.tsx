import { getServices } from '@/lib/queries/creators'
import { getLocations } from '@/lib/queries/creators'
import { AiPerfectMatch } from './ai-perfect-match'

export async function AiPerfectMatchWrapper() {
  const [services, locations] = await Promise.all([
    getServices(),
    getLocations(),
  ])

  return (
    <AiPerfectMatch
      services={services}
      locations={locations}
    />
  )
}