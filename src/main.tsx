import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import NotificationProvider from "./context/notification/NotificationContextProvider"
import AuthContextProvider from "./context/auth/AuthContextProvider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </NotificationProvider>
  </StrictMode>
)
