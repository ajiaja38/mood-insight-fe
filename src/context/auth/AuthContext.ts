import type { ERole } from "../../types/enum/ERole.enum"
import type { ILoginPayload } from "../../types/interface/IAuth.interface"
import { createContext, type Context } from "react"

export interface IAuthContext {
  login: (data: ILoginPayload) => Promise<void>
  logout: () => void
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  getRole: () => ERole
}

export const AuthContext: Context<IAuthContext | null> =
  createContext<IAuthContext | null>(null)
