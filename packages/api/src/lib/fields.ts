import { db } from "./db"

export async function getAllFields() {
  return db.selectFrom("fields").selectAll().orderBy("name", "asc").execute()
}

export async function getFieldById(id: string) {
  return db.selectFrom("fields").selectAll().where("id", "=", id).executeTakeFirst()
}
export async function getLatestSensorReadingsByFieldId(fieldId: string) {
  const sensors = await db
    .selectFrom("sensors")
    .select(["id", "type"])
    .where("field_id", "=", fieldId)
    .execute()

  const readings = await Promise.all(
    sensors.map(async (sensor) => {
      const latestReading = await db
        .selectFrom("sensor_readings")
        .select(["id", "value", "unit", "recorded_at as timestamp"])
        .where("sensor_id", "=", sensor.id)
        .orderBy("recorded_at", "desc")
        .executeTakeFirst()

      if (!latestReading) return null

      return {
        id: latestReading.id,
        type: sensor.type,
        value: Number(latestReading.value),
        unit: latestReading.unit,
        timestamp: latestReading.timestamp,
      }
    }),
  )

  return readings.filter((reading): reading is NonNullable<typeof reading> => reading !== null)
}
