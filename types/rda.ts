// src/types/rda.ts

/**
 * Single RDA entry
 * Example: protein → { value: 90, unit: "g" }
 */
export type RDAEntry = {
    value: number
    unit: string
  }
  
  /**
   * RDA map keyed by nutrient name
   * Example:
   * {
   *   protein: { value: 90, unit: "g" },
   *   vitaminC: { value: 90, unit: "mg" }
   * }
   */
  export type RDAMap = Record<string, RDAEntry>
  