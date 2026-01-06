import type {
    CalculatedFood,
    SelectedFood,
    NutrientValues,
  } from "./types"
  
  /**
   * Convert per-100g nutrients into actual intake
   */
  export function calculateItemNutrients(
    selected: SelectedFood
  ): CalculatedFood {
    const { food, grams } = selected
    const factor = grams / 100
  
    const nutrients: NutrientValues = {}
  
    // Macros
    if (food.macros) {
      for (const [key, value] of Object.entries(food.macros)) {
        if (typeof value === "number") {
          nutrients[key] = value * factor
        }
      }
    }
  
    // Micros
    if (food.micros) {
      for (const [key, value] of Object.entries(food.micros)) {
        if (typeof value === "number") {
          nutrients[key] = value * factor
        }
      }
    }
  
    return {
      id: food.id,
      name: food.name,
      grams,
      nutrients,
    }
  }
  