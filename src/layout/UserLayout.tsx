import { type FC, type JSX } from "react"
import Navbar from "../components/navbar"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"

const UserLayout: FC = (): JSX.Element => {
  return (
    <div className="font-varela">
      <Navbar />
      <div className="mt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default UserLayout
