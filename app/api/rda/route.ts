import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { RdaApiResponse } from "@/types/api"
import type { RDAMap } from "@/types/rda"

export async function GET(): Promise<NextResponse<RdaApiResponse>> {
  try {
    const rows = await prisma.rDAReference.findMany()

    const rdaMap: RDAMap = {}

    for (const row of rows) {
      rdaMap[row.nutrient] = {
        value: row.value,
        unit: row.unit,
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: rdaMap,
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("API /rda error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch RDA data",
      },
      { status: 500 }
    )
  }
}
