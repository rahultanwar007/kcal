import type {
    FoodItem,
    MacroNutrients,
    MicroNutrients,
  } from "@/app/generated/prisma/client"
  
  export type FoodWithNutrition = FoodItem & {
    macros: MacroNutrients | null
    micros: MicroNutrients | null
  }
  
  export type FoodsApiResponse =
    | {
        success: true
        message: string
        foods: FoodWithNutrition[]
      }
    | {
        success: false
        error: string
      }
  