import { getLocations } from "@/lib/queries/creators"
import LocationsContent from "./locations-content"

export default async function LocationsPage() {
  const locations = await getLocations()

  return <LocationsContent locations={locations} />
}