import { createContext } from 'react'
import { ReactSession } from 'react-client-session'

ReactSession.setStoreType("localStorage")
export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {

    const notificationLogin = (notification) => {
        ReactSession.set('notification', notification)
    }
    const readNotification = () => {
        let notifications = ReactSession.get("notification")

        //Quantidade de notificações que aparece: 10
        if (notifications.length > 10) {
            notifications.pop()
        }

        return notifications
    }
    const updateNotification = (newNotification) => {
        let old = readNotification()
        if (old.length === 0) {
            return ReactSession.set("notification", [newNotification])
        }

        old.unshift(newNotification)
        return ReactSession.set("notification", old)
    }

    return (
        <NotificationContext.Provider value={ { notificationLogin, readNotification, updateNotification } }>
            { children }
        </NotificationContext.Provider>
    )
}