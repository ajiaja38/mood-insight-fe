import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import LocalStorageService from "../../service/localStorage.service"
import { useNotification } from "../../hooks/useNotification"
import type {
  ILoginPayload,
  ILoginResponse,
} from "../../types/interface/IAuth.interface"
import { UserService } from "../../service/user.service"
import type { ResponseEntity } from "../../types/interface/IResponse.interface"
import type { ERole } from "../../types/enum/ERole.enum"
import { jwtDecode } from "jwt-decode"
import type { IJwtPayload } from "../../types/interface/IJwtPayload.interface"
import { AuthContext } from "./AuthContext"

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, _setAccessToken] = useState<string | null>(
    LocalStorageService.getAccessToken()
  )
  const [refreshToken, _setRefreshToken] = useState<string | null>(
    LocalStorageService.getRefreshToken()
  )
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    LocalStorageService.isAuthenticated()
  )

  const { openNotification } = useNotification()

  const login = useCallback(
    async (data: ILoginPayload): Promise<void> => {
      try {
        const response: ResponseEntity<ILoginResponse> =
          await UserService.login(data)

        LocalStorageService.set(response.data)

        _setAccessToken(response.data.accessToken)
        _setRefreshToken(response.data.refreshToken)
        setIsAuthenticated(true)

        openNotification({
          message: "Login Success!",
          description: response.message,
          type: "success",
        })
      } catch (error: any) {
        openNotification({
          message: "Login Failed",
          description: error.response.data.message,
          type: "error",
        })
      }
    },
    [openNotification]
  )

  const logout = useCallback((): void => {
    LocalStorageService.remove()
    _setAccessToken(null)
    _setRefreshToken(null)
    setIsAuthenticated(false)
  }, [])

  const getRole = useCallback((): ERole => {
    const token: string | null = LocalStorageService.getAccessToken()
    const decoded: IJwtPayload = jwtDecode<IJwtPayload>(token as string)
    return decoded.role
  }, [])

  useEffect(() => {
    setIsAuthenticated(LocalStorageService.isAuthenticated())
  }, [])

  const value = useMemo(
    () => ({
      login,
      logout,
      accessToken,
      refreshToken,
      isAuthenticated,
      getRole,
    }),
    [login, logout, accessToken, refreshToken, isAuthenticated, getRole]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
