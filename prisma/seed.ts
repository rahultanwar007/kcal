import { prisma } from "@/lib/prisma"

type FoodSeed = {
  name: string
  category: any
  macros: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
  }
  micros?: {
    iron?: number
    calcium?: number
    magnesium?: number
    zinc?: number
    potassium?: number
    sodium?: number
    vitaminA?: number
    vitaminC?: number
    vitaminD?: number
    vitaminB12?: number
    omega3?: number
  }
}

async function createFood(food: FoodSeed) {
  const item = await prisma.foodItem.create({
    data: {
      name: food.name,
      category: food.category,
    },
  })

  await prisma.macroNutrients.create({
    data: {
      foodId: item.id,
      ...food.macros,
    },
  })

  if (food.micros) {
    await prisma.microNutrients.create({
      data: {
        foodId: item.id,
        ...food.micros,
      },
    })
  }
}

async function seedRDA() {
  const rdaData = [
    { nutrient: "calories", unit: "kcal", value: 2400 },
    { nutrient: "protein", unit: "g", value: 90 },
    { nutrient: "carbs", unit: "g", value: 300 },
    { nutrient: "fat", unit: "g", value: 70 },
    { nutrient: "fiber", unit: "g", value: 30 },

    { nutrient: "iron", unit: "mg", value: 17 },
    { nutrient: "calcium", unit: "mg", value: 1000 },
    { nutrient: "magnesium", unit: "mg", value: 400 },
    { nutrient: "zinc", unit: "mg", value: 11 },
    { nutrient: "potassium", unit: "mg", value: 3500 },
    { nutrient: "sodium", unit: "mg", value: 2300 },

    { nutrient: "vitaminA", unit: "µg", value: 900 },
    { nutrient: "vitaminC", unit: "mg", value: 90 },
    { nutrient: "vitaminD", unit: "IU", value: 600 },
    { nutrient: "vitaminB12", unit: "µg", value: 2.4 },

    { nutrient: "omega3", unit: "g", value: 1.6 },
  ]

  for (const rda of rdaData) {
    await prisma.rDAReference.upsert({
      where: { nutrient: rda.nutrient },
      update: {},
      create: rda,
    })
  }
}


async function main() {
  console.log("🌱 Seeding kcal database (schema-safe)...")

  const foods: FoodSeed[] = [
    /* ================= DAIRY & PROTEIN ================= */

    {
      name: "Paneer",
      category: "PROTEIN",
      macros: { calories: 265, protein: 18, carbs: 6, fat: 20 },
      micros: { calcium: 350, iron: 0.7, zinc: 2.3, vitaminB12: 1.1 },
    },
    {
      name: "Milk (cow)",
      category: "PROTEIN",
      macros: { calories: 60, protein: 3.2, carbs: 4.8, fat: 3.3 },
      micros: { calcium: 120, potassium: 150, vitaminB12: 0.5 },
    },

    /* ================= SEEDS & FATS ================= */

    {
      name: "Chia seeds",
      category: "FAT",
      macros: { calories: 486, protein: 16.5, carbs: 42.1, fat: 30.7, fiber: 34.4 },
      micros: { calcium: 631, magnesium: 335, iron: 7.7, omega3: 17.8 },
    },
    {
      name: "Flax seeds",
      category: "FAT",
      macros: { calories: 534, protein: 18.3, carbs: 28.9, fat: 42.2, fiber: 27.3 },
      micros: { magnesium: 392, iron: 5.7, omega3: 22.8 },
    },
    {
      name: "Pumpkin seeds",
      category: "FAT",
      macros: { calories: 559, protein: 30, carbs: 11, fat: 49, fiber: 6 },
      micros: { magnesium: 592, zinc: 7.8, iron: 8.8 },
    },
    {
      name: "Cow ghee",
      category: "FAT",
      macros: { calories: 900, protein: 0, carbs: 0, fat: 100 },
      micros: { vitaminA: 840 },
    },

    /* ================= GRAINS ================= */

    {
      name: "Oats (raw)",
      category: "CARB",
      macros: { calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fiber: 10.6 },
      micros: { iron: 4.7, magnesium: 177, zinc: 4 },
    },
    {
      name: "Rice (raw)",
      category: "CARB",
      macros: { calories: 365, protein: 7.1, carbs: 80, fat: 0.7, fiber: 1.3 },
    },
    {
      name: "Rice (cooked)",
      category: "CARB",
      macros: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 },
    },
    {
      name: "Chapati (1 medium)",
      category: "CARB",
      macros: { calories: 120, protein: 3, carbs: 18, fat: 3, fiber: 3 },
    },

    /* ================= VEGETABLES ================= */

    {
      name: "Broccoli",
      category: "VEGETABLE",
      macros: { calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4, fiber: 2.6 },
      micros: { vitaminC: 89, potassium: 316 },
    },
    {
      name: "Carrot",
      category: "VEGETABLE",
      macros: { calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8 },
      micros: { vitaminA: 835, potassium: 320 },
    },
    {
      name: "Capsicum",
      category: "VEGETABLE",
      macros: { calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1 },
      micros: { vitaminC: 127 },
    },

    /* ================= FRUITS ================= */

    {
      name: "Apple",
      category: "FRUIT",
      macros: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4 },
      micros: { vitaminC: 4.6 },
    },
    {
      name: "Banana",
      category: "FRUIT",
      macros: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 },
      micros: { potassium: 358 },
    },

    /* ================= PULSES (RAW & COOKED) ================= */

    {
      name: "Yellow moong dal (raw)",
      category: "PROTEIN",
      macros: { calories: 347, protein: 24, carbs: 63, fat: 1.2, fiber: 16 },
      micros: { iron: 6.7, magnesium: 189 },
    },
    {
      name: "Yellow moong dal (cooked)",
      category: "PROTEIN",
      macros: { calories: 105, protein: 7, carbs: 19, fat: 0.4, fiber: 8 },
      micros: { iron: 1.4 },
    },

    {
      name: "Masoor dal (raw)",
      category: "PROTEIN",
      macros: { calories: 352, protein: 25, carbs: 60, fat: 1.1, fiber: 11 },
      micros: { iron: 7.5, magnesium: 122 },
    },
    {
      name: "Masoor dal (cooked)",
      category: "PROTEIN",
      macros: { calories: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 8 },
      micros: { iron: 2.1 },
    },

    {
      name: "Black chana (raw)",
      category: "PROTEIN",
      macros: { calories: 364, protein: 20, carbs: 61, fat: 6, fiber: 17 },
      micros: { iron: 6.2, magnesium: 115 },
    },
    {
      name: "Black chana (cooked)",
      category: "PROTEIN",
      macros: { calories: 164, protein: 9, carbs: 27, fat: 2.6, fiber: 8 },
      micros: { iron: 2.9 },
    },

    /* ================= SUPPLEMENTS ================= */

    {
      name: "Tofu (custom brand)",
      category: "PROTEIN",
      macros: { calories: 82, protein: 16, carbs: 3.75, fat: 0.7 },
      micros: { sodium: 5.37 },
    },
    {
      name: "Whey protein (Naturaltein Max)",
      category: "SUPPLEMENT",
      macros: { calories: 400, protein: 63.15, carbs: 22.9, fat: 5 },
      micros: { sodium: 245.7 },
    },
    {
      name: "Nutritional yeast (Urban Platter)",
      category: "SUPPLEMENT",
      macros: { calories: 350, protein: 50, carbs: 35, fat: 5, fiber: 25 },
      micros: { vitaminB12: 50 },
    },
    {
      name: "Vitamin D3 + K2 (tablet)",
      category: "SUPPLEMENT",
      macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      micros: { vitaminD: 600 },
    },
    {
      name: "Creatine monohydrate",
      category: "SUPPLEMENT",
      macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    },
  ]

  for (const food of foods) {
    await createFood(food)
  }

    // NEW
    await seedRDA()

    console.log("✅ Foods + RDA seeded successfully")
}


main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
