import type { ERole } from "../enum/ERole.enum"

export interface IJwtPayload {
  id: string
  name: string
  email: string
  role: ERole
  iat: number
  exp: number
}
