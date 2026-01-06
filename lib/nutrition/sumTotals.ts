import type { CalculatedFood, DailyTotals } from "./types"

/**
 * Sum nutrients across all foods
 */
export function sumTotals(
  items: CalculatedFood[]
): DailyTotals {
  const totals: DailyTotals = {}

  for (const item of items) {
    for (const [nutrient, value] of Object.entries(item.nutrients)) {
      totals[nutrient] = (totals[nutrient] ?? 0) + value
    }
  }

  return totals
}
