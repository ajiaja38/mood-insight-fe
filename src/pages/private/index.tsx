import React, { type JSX } from "react"
import type { IAuthContext } from "../../context/auth/AuthContext"
import { useAuth } from "../../hooks/useAuth"
import UseTitle from "../../hooks/useTitle"
import BreadCrumb from "../../components/Breadcumb"

const DashboardHome: React.FC = (): JSX.Element => {
  const auth: IAuthContext = useAuth()

  return (
    <>
      <UseTitle title="Dashboard" />
      <div>
        <BreadCrumb items={[{ title: "Home" }]} />
        <div>Your Role: {auth.getRole()}</div>
      </div>
    </>
  )
}

export default DashboardHome
