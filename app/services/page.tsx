import { getServices } from "@/lib/queries/creators"
import ServicesContent from "./services-content"

export default async function ServicesPage() {
  const services = await getServices()

  return <ServicesContent services={services} />
}