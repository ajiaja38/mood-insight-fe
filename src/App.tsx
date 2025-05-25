import React, { type JSX } from "react"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"

const App: React.FC = (): JSX.Element => {
  return <RouterProvider router={router} />
}

export default App
