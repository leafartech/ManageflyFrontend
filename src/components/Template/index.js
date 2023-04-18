import styles from './Template.module.css'
import { UserContext } from 'context/UserContext'
import AcessoNegado from 'pages/AcessoNegado'
import { useContext, useEffect, useState } from 'react'

export default function Template({ children }) {
    const { readUser } = useContext(UserContext)
    const [ user, setUser ] = useState([])

    useEffect(() => {
        setUser(readUser())
    }, [])

    if (user.length === 0) {
        return <AcessoNegado />
    }

    return (
        <div className={ styles.template }>
            { children }
        </div>
    )
}