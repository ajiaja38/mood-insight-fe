import React from "react"
import type { ERole } from "../../types/enum/ERole.enum"
import { useAuth } from "../../hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"

interface props {
  redirectPath: string
  role: ERole
}

const RoleGuard: React.FC<props> = ({ redirectPath, role }) => {
  const { getRole } = useAuth()

  if (role !== getRole()) return <Navigate to={redirectPath} replace />

  return <Outlet />
}

export default RoleGuard
