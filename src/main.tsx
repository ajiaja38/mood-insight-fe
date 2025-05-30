import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import NotificationProvider from "./context/notification/NotificationContextProvider"
import AuthContextProvider from "./context/auth/AuthContextProvider"
import { App as AntApp, ConfigProvider } from "antd"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <AuthContextProvider>
        <AntApp>
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  darkSubMenuItemBg: "transparent",
                  darkItemHoverBg: "#072541",
                },
              },
            }}
          >
            <App />
          </ConfigProvider>
        </AntApp>
      </AuthContextProvider>
    </NotificationProvider>
  </StrictMode>
)
