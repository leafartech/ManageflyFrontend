import { NotificationContext } from 'context/NotificationContext'
import styles from './Template.module.css'
import { UserContext } from 'context/UserContext'
import AcessoNegado from 'pages/AcessoNegado'
import { useContext, useEffect, useState } from 'react'

export default function Template({ children }) {
    const { readUser } = useContext(UserContext)
    const [ user, setUser ] = useState([])
    const { updateNotification, readNotification } = useContext(NotificationContext)
    const [ taskDeadlineAlert, setTaskDeadlineAlert] = useState([])

    useEffect(() => {
        setUser(readUser())
    }, [])

    useEffect(() => {
        let currentDate = new Date()
        let taskDeadline = ''

        for (let p in user.projects) {
            for (let p2 in user.projects[p].tasks) {
                taskDeadline = user.projects[p].tasks[p2].deadline
                let partDeadline = taskDeadline.split('-')
                let data = new Date(partDeadline[0], partDeadline[1] - 1, partDeadline[2])
                if (user.projects[p].status === 'ativo' && user.projects[p].tasks[p2].situacao === false && parseInt(partDeadline[1]) === currentDate.getMonth()+1 && parseInt(partDeadline[2]) === currentDate.getDate()+1) {
                    let alreadyExist = false
                    const notifications = readNotification()
                    notifications.map(notification => {
                        if (notification[2] === user.projects[p].tasks[p2].name) {
                            console.log('notificação já existe')
                            alreadyExist = true
                        } 
                    })
                    if (alreadyExist === false) {
                        let date = new Date()
                        let month = ''
                        if (date.getMonth() < 10) {
                            month = `0${date.getMonth()+1}`
                        } else {
                            month = date.getMonth()+1
                        }
                        
                        let minutes = `${date.getMinutes()}`
                        if (minutes.length === 1) { minutes = `0${minutes}` }
                        
                        let day = `${date.getDate()}`
                        if (day.length === 1) day = `0${day}`
        
                        let projectId = parseInt(p) + 1
        
                        let formated = `${day}/${month} - ${date.getHours()}:${minutes}`
                        updateNotification(["excludeTask", formated, user.projects[p].tasks[p2].name, projectId])
                    }

                }
            }
        }
    }, [user])

    if (user.length === 0) {
        return <AcessoNegado />
    }

    return (
        <div className={ styles.template }>
            { children }
        </div>
    )
}