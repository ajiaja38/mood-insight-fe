import type { ERole } from "../enum/ERole"

export interface IJwtPayload {
  id: string
  name: string
  email: string
  role: ERole
  iat: number
  exp: number
}
