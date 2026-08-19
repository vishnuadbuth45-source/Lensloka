import { CreatorsContent } from "./creators-content"
import { getCreators } from "@/lib/queries/creators"

export default async function CreatorsPage() {
  const creators = await getCreators()

  return <CreatorsContent creators={creators} />
}