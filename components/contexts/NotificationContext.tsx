import { createContext, useContext, useState } from 'react'

type notificationData = {
  title: string
  protocol: string
  name: string
  action: string
} | null

type notificationContextType = {
  notificationData: notificationData
  removeNotification: () => void
  createNotification: (data: notificationData) => void
}

const defaultValues: notificationContextType = {
  notificationData: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeNotification: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  createNotification: () => {},
}

const NotificationContext = createContext<notificationContextType>(
  defaultValues
)

export function useNotification(): notificationContextType {
  return useContext(NotificationContext)
}

export const NotificationProvider: React.FC = ({ children }) => {
  const [notificationData, setNotificationData] = useState<notificationData>(
    null
  )

  const removeNotification = () => {
    setNotificationData(null)
  }

  const createNotification = (data: notificationData) => {
    setNotificationData(data)
  }

  const value = { notificationData, removeNotification, createNotification }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}
