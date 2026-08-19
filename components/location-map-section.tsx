import { getLocations } from "@/lib/queries/creators";
import { LocationMap } from "./location-map";

export async function LocationMapSection() {
  const locations = await getLocations();

  return <LocationMap locations={locations} />;
}