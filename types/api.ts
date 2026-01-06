import type { RDAMap } from "./rda"

/**
 * /api/rda success response
 */
export type RdaSuccessResponse = {
  success: true
  data: RDAMap
}

/**
 * /api/rda error response
 */
export type RdaErrorResponse = {
  success: false
  error: string
}

/**
 * Union type for /api/rda
 */
export type RdaApiResponse =
  | RdaSuccessResponse
  | RdaErrorResponse
