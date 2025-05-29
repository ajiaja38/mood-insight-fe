import React, { type JSX } from "react"
import { Outlet } from "react-router-dom"

const AuthenticationLayout: React.FC = (): JSX.Element => {
  return (
    <div className="h-screen md:bg-slate-100 md:flex md:flex-col md:justify-center md:items-center px-4 md:px-0">
      <div className="p-3 md:bg-white w-full md:w-[35rem] md:shadow-xl px-7">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthenticationLayout
