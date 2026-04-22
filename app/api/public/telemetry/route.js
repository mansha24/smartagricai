import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    sensors: [
      { id: "S-001", type: "soil-moisture", value: "42%", status: "optimal" },
      { id: "S-002", type: "temperature", value: "23°C", status: "normal" },
      { id: "S-003", type: "humidity", value: "56%", status: "balanced" },
      { id: "S-004", type: "light-intensity", value: "7,200 lx", status: "good" },
    ],
    lastUpdated: new Date().toISOString(),
  });
}
