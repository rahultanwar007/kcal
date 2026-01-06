export type CalculateRequestItem = {
  foodId: string;
  grams: number;
};

export type CalculateRequestBody = {
  items: CalculateRequestItem[];
};

import type {
  CalculatedFood,
  DailyTotals,
  RDAComparisonMap,
} from "@/lib/nutrition";

export type CalculateSuccessResponse = {
  success: true;
  items: CalculatedFood[];
  totals: DailyTotals;
  rda: RDAComparisonMap;
};

export type CalculateErrorResponse = {
  success: false;
  error: string;
};

export type CalculateApiResponse =
  | CalculateSuccessResponse
  | CalculateErrorResponse;
