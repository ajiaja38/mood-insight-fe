import React, { type JSX } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import type { IAuthContext } from "../../context/auth/AuthContext"
import LocalStorageService from "../../service/localStorage.service"

interface props {
  redirectPath: string
}

const RouterGuard: React.FC<props> = ({ redirectPath }): JSX.Element => {
  const { isAuthenticated }: IAuthContext = useAuth()

  if (!LocalStorageService.isHaveToken() || !isAuthenticated)
    return <Navigate to={redirectPath} replace />

  return <Outlet />
}

export default RouterGuard
