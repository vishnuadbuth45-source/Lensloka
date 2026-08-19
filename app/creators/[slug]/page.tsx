import { notFound } from "next/navigation"
import { CreatorsContent } from "../creators-content"
import { getCreatorsByServiceSlug } from "@/lib/queries/creators"

type ServiceCreatorsPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function ServiceCreatorsPage({
  params,
}: ServiceCreatorsPageProps) {
  const { slug } = await params

  const creators = await getCreatorsByServiceSlug(slug)

  if (creators.length === 0) {
    notFound()
  }

  return (
    <CreatorsContent
      creators={creators}
      selectedService={slug}
    />
  )
}