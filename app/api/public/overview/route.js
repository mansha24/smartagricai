import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    summary: {
      farmName: "Green Valley Farm",
      activeFields: 12,
      averageMoisture: "42%",
      cropHealth: "91%",
      irrigationZonesActive: 3,
    },
    nextIrrigation: "2026-04-15T06:30:00.000Z",
    alerts: [
      { level: "info", message: "Soil moisture is stable across greenhouse zones." },
      { level: "warning", message: "Temperature trend increased in orchard B." },
      { level: "success", message: "Automatic fertilization plan completed successfully." },
    ],
  });
}
