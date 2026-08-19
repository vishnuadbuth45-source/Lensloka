import { notFound } from 'next/navigation'
import { CreatorsContent } from '../creators-content'
import { getCreatorsByMatch } from '@/lib/queries/creators'

type MatchPageProps = {
  searchParams: Promise<{
    service?: string
    location?: string
    budgetMin?: string
    budgetMax?: string
  }>
}

export default async function MatchPage({
  searchParams,
}: MatchPageProps) {
  const params = await searchParams

  const service = params.service
  const location = params.location
  const budgetMin = Number(params.budgetMin)

  const budgetMax =
    params.budgetMax !== undefined
      ? Number(params.budgetMax)
      : null

  if (
    !service ||
    !location ||
    Number.isNaN(budgetMin)
  ) {
    notFound()
  }

  const creators = await getCreatorsByMatch(
    service,
    location,
    budgetMin,
    budgetMax
  )

  if (creators.length === 0) {
    notFound()
  }

  return (
    <CreatorsContent
      creators={creators}
      selectedService={service}
    />
  )
}