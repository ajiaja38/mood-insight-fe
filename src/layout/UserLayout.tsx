import { type FC, type JSX } from "react"
import Navbar from "../components/navbar"
import { Outlet } from "react-router-dom"

const UserLayout: FC = (): JSX.Element => {
  return (
    <div className="font-varela">
      <Navbar />
      <div className="mt-20 p-4 lg:px-9 3xl:px-0 container mx-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default UserLayout
