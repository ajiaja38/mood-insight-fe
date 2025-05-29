import React, { type JSX } from "react"
import type { IAuthContext } from "../../context/auth/AuthContext"
import { useAuth } from "../../hooks/useAuth"

const DashboardHome: React.FC = (): JSX.Element => {
  const auth: IAuthContext = useAuth()

  return <div>Your Role: {auth.getRole()}</div>
}

export default DashboardHome
