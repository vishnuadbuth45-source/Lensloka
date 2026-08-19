import { CreatorsContent } from "./creators-content"
import { getCreators } from "@/lib/queries/creators"
import { Suspense } from "react"

export default async function CreatorsPage() {
  const creators = await getCreators()

  return (
    <Suspense fallback="Loading creators...">
      <CreatorsContent creators={creators} />
    </Suspense>
  )
}