import type { JsonObject } from '@/types/json.types'

export type UserProfileDetailsResponse = JsonObject & { data: { permissions: string[] } }

export type UserProfileDetails = {
  permissions: string[]
  data: UserProfileDetailsResponse
}

