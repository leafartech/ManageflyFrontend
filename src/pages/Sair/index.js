import api from "api"
import { NotificationContext } from "context/NotificationContext"
import { UserContext } from "context/UserContext"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Sair() {
    const { cleanUser, readUser } = useContext(UserContext)
    const { readNotification } = useContext(NotificationContext)
    const user = readUser().email


    const navegar = useNavigate()

    useEffect(() => {
        const data = new URLSearchParams()
        data.append("user", user)
        data.append("notifications", readNotification())

        console.log(readNotification())

        api.post("/sair", data).then(res => {
            console.log(readNotification())
            cleanUser()
            setTimeout(() => {
                navegar("/inicio")
            }, "3000")
        })
    })
    
    return (
        <div>
            Saindo...
        </div>
    )
}