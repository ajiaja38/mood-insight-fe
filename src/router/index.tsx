import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../pages/common/LoginPage"
import LandingPage from "../pages/common"

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ])
