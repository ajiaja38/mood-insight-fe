import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../pages/common/LoginPage"
import LandingPage from "../pages/common"
import RegisterPage from "../pages/common/RegisterPage"
import AuthenticationLayout from "../layout/AuthenticationLayout"
import RouterGuard from "./guard/RouterGuard"
import DashboardHome from "../pages/private"

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "",
      element: <AuthenticationLayout />,
      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: "",
      element: <RouterGuard redirectPath="/login" />,
      children: [
        {
          path: "/dashboard",
          element: <DashboardHome />,
        },
      ],
    },
  ])
