import { useContext } from "react"
import { AuthContext, type IAuthContext } from "../context/auth/AuthContext"

export const useAuth = (): IAuthContext => {
  const context: IAuthContext | null = useContext(AuthContext)

  if (!context) throw new Error("useAuth must be used within a AuthProvider")

  return context
}
