import type { FoodWithNutrition } from "@/types/foods"
import type { RDAMap } from "@/types/rda"

/**
 * Nutrient values after scaling by grams
 */
export type NutrientValues = Record<string, number>

/**
 * Food item selected by user
 */
export type SelectedFood = {
  food: FoodWithNutrition
  grams: number
}

/**
 * Result after calculating one food item
 */
export type CalculatedFood = {
  id: string
  name: string
  grams: number
  nutrients: NutrientValues
}

/**
 * Aggregated daily totals
 */
export type DailyTotals = NutrientValues

/**
 * RDA comparison result for a nutrient
 */
export type RDAComparison = {
  value: number
  rda: number
  unit: string
  percentage: number
  status: "LOW" | "NEEDS_ATTENTION" | "OPTIMAL" | "HIGH"
}

/**
 * All RDA comparisons
 */
export type RDAComparisonMap = Record<string, RDAComparison>

export type { RDAMap }
