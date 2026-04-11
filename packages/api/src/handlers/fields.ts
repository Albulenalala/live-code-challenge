import { Request, Response } from "express"
import { getAllFields, getFieldById } from "../lib/fields"

export async function handleGetFields(req: Request, res: Response) {
  try {
    const fields = await getAllFields()
    res.json(fields)
  } catch (error) {
    console.error("Error fetching fields:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export async function handleGetField(req: Request, res: Response) {
  try {
    const { id } = req.params
    const field = await getFieldById(id)

    if (!field) {
      res.status(404).json({ error: "Field not found" })
      return
    }

    res.json(field)
  } catch (error) {
    console.error("Error fetching field:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export async function handleGetFieldReadings(req: Request, res: Response) {
  try {
    const { id } = req.params

    const readings = [
      {
        id: "1",
        type: "temperature",
        value: 24.5,
        unit: "°C",
        timestamp: new Date().toISOString(),
      },
      {
        id: "2",
        type: "humidity",
        value: 60,
        unit: "%",
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      },
    ]

    res.json(readings)
  } catch (error) {
    console.error("Error fetching sensor readings:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}
