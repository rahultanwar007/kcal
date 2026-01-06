import type {
    DailyTotals,
    RDAMap,
    RDAComparisonMap,
  } from "./types"
  
  /**
   * Determine status based on % of RDA
   */
  function getStatus(percentage: number) {
    if (percentage < 70) return "LOW"
    if (percentage < 90) return "NEEDS_ATTENTION"
    if (percentage <= 120) return "OPTIMAL"
    return "HIGH"
  }
  
  /**
   * Compare totals against RDA reference
   */
  export function compareWithRDA(
    totals: DailyTotals,
    rda: RDAMap
  ): RDAComparisonMap {
    const comparison: RDAComparisonMap = {}
  
    for (const [nutrient, rdaEntry] of Object.entries(rda)) {
      const totalValue = totals[nutrient] ?? 0
      const percentage =
        rdaEntry.value > 0
          ? (totalValue / rdaEntry.value) * 100
          : 0
  
      comparison[nutrient] = {
        value: totalValue,
        rda: rdaEntry.value,
        unit: rdaEntry.unit,
        percentage: Number(percentage.toFixed(1)),
        status: getStatus(percentage),
      }
    }
  
    return comparison
  }
  