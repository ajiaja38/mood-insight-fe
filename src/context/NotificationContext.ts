import { createContext } from "react"
import type { INotificationMessage } from "./NotificationContextProvider"

export interface INotificationContext {
  openNotification: (data: INotificationMessage) => void
}

export const NotificationContext: React.Context<INotificationContext | null> =
  createContext<INotificationContext | null>(null)
