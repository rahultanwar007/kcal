import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

import {
  calculateItemNutrients,
  sumTotals,
  compareWithRDA,
} from "@/lib/nutrition"

import type {
  CalculateApiResponse,
  CalculateRequestBody,
} from "@/types/calculate"
import type { RDAMap } from "@/types/rda"

export async function POST(
  request: Request
): Promise<NextResponse<CalculateApiResponse>> {
  try {
    const body = (await request.json()) as CalculateRequestBody

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "No items provided" },
        { status: 400 }
      )
    }

    // 1️⃣ Fetch foods from DB
    const foodIds = body.items.map((i) => i.foodId)

    const foods = await prisma.foodItem.findMany({
      where: { id: { in: foodIds } },
      include: {
        macros: true,
        micros: true,
      },
    })

    // Map foodId → food
    const foodMap = new Map(
      foods.map((food) => [food.id, food])
    )

    // 2️⃣ Prepare selected foods
    const selectedFoods = body.items.map((item) => {
      const food = foodMap.get(item.foodId)

      if (!food) {
        throw new Error(`Food not found: ${item.foodId}`)
      }

      return {
        food,
        grams: item.grams,
      }
    })

    // 3️⃣ Calculate per-item nutrients
    const calculatedItems = selectedFoods.map(
      calculateItemNutrients
    )

    // 4️⃣ Sum totals
    const totals = sumTotals(calculatedItems)

    // 5️⃣ Fetch RDA data
    const rdaRows = await prisma.rDAReference.findMany()

    const rda: RDAMap = {}
    for (const row of rdaRows) {
      rda[row.nutrient] = {
        value: row.value,
        unit: row.unit,
      }
    }

    // 6️⃣ Compare with RDA
    const rdaComparison = compareWithRDA(totals, rda)

    return NextResponse.json(
      {
        success: true,
        items: calculatedItems,
        totals,
        rda: rdaComparison,
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("API /calculate error:", error)

    return NextResponse.json(
      { success: false, error: "Calculation failed" },
      { status: 500 }
    )
  }
}
