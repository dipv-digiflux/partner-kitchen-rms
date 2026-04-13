/** Shape of a role as returned from the API */
export type UserRoleObject = {
  _id: string
  name: string
}

/** Role can be a plain string ID or a full role object (when populated by the API) */
export type UserRole = string | UserRoleObject

export type UserPayload = {
  _id: string
  name?: string
  email: string
  status: boolean
  /** In the form, role is an array of selected option values (string[]).
   *  In the API response it may come back as UserRoleObject[]. */
  role: UserRole[]
  country_code: string
  mobile: string
  createdAt?: string
  password: string
  confirmPassword: string
}
