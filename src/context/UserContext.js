import { createContext } from 'react'
import { ReactSession } from 'react-client-session'

ReactSession.setStoreType("localStorage")
export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const expirationTime = new Date().getTime() + 1800; // 30 minutes in milliseconds
    //1800000 - 30min

    const userLogin = (user) => {
        ReactSession.set('user', user, { expires: expirationTime })
    }

    const readUser = () => {
        return ReactSession.get("user")
    }

    const cleanUser = () => {
        ReactSession.set('user', [])
    }

    return (
        <UserContext.Provider value={ { userLogin, readUser, cleanUser } }>
            { children }
        </UserContext.Provider>
    )
}