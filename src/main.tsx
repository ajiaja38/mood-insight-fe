import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import NotificationProvider from "./context/notification/NotificationContextProvider"
import AuthContextProvider from "./context/auth/AuthContextProvider"
import { App as AntApp, ConfigProvider } from "antd"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { customMainTheme } from "./theme/cutom.theme"
import TableActionContextProvider from "./context/TableAction/TableActionContextProvider"

const queryClient: QueryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <AuthContextProvider>
        <AntApp>
          <ConfigProvider theme={customMainTheme}>
            <QueryClientProvider client={queryClient}>
              <TableActionContextProvider>
                <App />
              </TableActionContextProvider>
            </QueryClientProvider>
          </ConfigProvider>
        </AntApp>
      </AuthContextProvider>
    </NotificationProvider>
  </StrictMode>
)
