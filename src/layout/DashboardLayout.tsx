import React, { type JSX } from "react"
import { Outlet } from "react-router-dom"

const DashboardLayout: React.FC = (): JSX.Element => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default DashboardLayout
