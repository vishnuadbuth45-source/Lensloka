import { notFound } from "next/navigation"

import {
  getLocationBySlug,
  getCreatorsByLocationSlug,
} from "@/lib/queries/creators"

import { LocationCreatorsContent } from "./location-creators-content"

type LocationPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function LocationPage({
  params,
}: LocationPageProps) {
  const { slug } = await params

  const location = await getLocationBySlug(slug)

  if (!location) {
    notFound()
  }

  const creators = await getCreatorsByLocationSlug(slug)

  return (
    <LocationCreatorsContent
      location={location}
      creators={creators}
    />
  )
}