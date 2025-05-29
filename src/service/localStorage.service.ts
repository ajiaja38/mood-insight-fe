import { jwtDecode } from "jwt-decode"
import type { ILoginResponse } from "../types/interface/IAuth.interface"
import type { IJwtPayload } from "../types/interface/IJwtPayload.interface"

class LocalStorageService {
  public static set(payload: ILoginResponse): void {
    localStorage.setItem("accessToken", payload.accessToken)
    localStorage.setItem("refreshToken", payload.refreshToken)
  }

  public static getAccessToken(): string | null {
    return localStorage.getItem("accessToken")
  }

  public static getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken")
  }

  public static isHaveToken(): boolean {
    return this.getAccessToken() !== null && this.getRefreshToken() !== null
  }

  public static isAuthenticated(): boolean {
    const isHavetoken: boolean =
      this.getAccessToken() !== null && this.getRefreshToken() !== null

    if (!isHavetoken) return false

    const token: string | null = this.getAccessToken()
    const decoded: IJwtPayload = jwtDecode<IJwtPayload>(token as string)
    const currentTime: number = Date.now() / 1000

    if (decoded.exp < currentTime) {
      this.remove()
      return false
    }

    return true
  }

  public static remove(): void {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }
}

export default LocalStorageService
