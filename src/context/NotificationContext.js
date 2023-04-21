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
        if (notifications.length > 20) {
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

    const cleanNotification = () => {
        ReactSession.set("notification", [])
        console.log(readNotification())
    }

    return (
        <NotificationContext.Provider value={ { notificationLogin, readNotification, updateNotification, cleanNotification } }>
            { children }
        </NotificationContext.Provider>
    )
}