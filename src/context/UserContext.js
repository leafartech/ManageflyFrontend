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

    const modifyUser = (projectId, taskId, situacao) => {
        const user = readUser()
        let modifiedUser = user
        modifiedUser.projects[projectId].tasks[taskId].situacao = situacao

        userLogin(modifiedUser)
    }

    const cleanUser = () => {
        ReactSession.set('user', [])
    }

    return (
        <UserContext.Provider value={ { userLogin, readUser, modifyUser, cleanUser } }>
            { children }
        </UserContext.Provider>
    )
}