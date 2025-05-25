import { notification } from "antd"
import React, { useCallback, useMemo } from "react"
import { NotificationContext } from "./NotificationContext"

type NotificationType = "success" | "info" | "warning" | "error"

export interface INotificationMessage {
  message: string
  description: string
  type?: NotificationType
}

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification()

  const openNotification: ({
    message,
    description,
    type,
  }: INotificationMessage) => void = useCallback(
    ({ message, description, type }: INotificationMessage) => {
      api[type || "info"]({
        message,
        description,
        placement: "topRight",
      })
    },
    [api]
  )

  const value = useMemo(() => ({ openNotification }), [openNotification])

  return (
    <NotificationContext.Provider value={value}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
