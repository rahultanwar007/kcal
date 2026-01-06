import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { FoodsApiResponse } from "@/types/foods"

export async function GET(): Promise<NextResponse<FoodsApiResponse>> {
  try {
    const foods = await prisma.foodItem.findMany({
      orderBy: { name: "asc" },
      include: {
        macros: true,
        micros: true,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Foods fetched successfully",
        foods,
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("API /foods error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch foods",
      },
      { status: 500 }
    )
  }
}
