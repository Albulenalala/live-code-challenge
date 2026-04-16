import { useQuery } from "@tanstack/react-query"
import { api } from "../api/client"

export type SensorReading = {
  id: string
  value: number
  type: string
  unit: string
  timestamp: string
}

async function getSensorReadings(fieldId: string): Promise<SensorReading[]> {
  const response = await api.get<SensorReading[]>(`/fields/${fieldId}/readings`)
  return response.data
}

export function useSensorReadings(fieldId: string) {
  return useQuery({
    queryKey: ["sensor-readings", fieldId],
    queryFn: () => getSensorReadings(fieldId),
    enabled: !!fieldId,
  })
}
