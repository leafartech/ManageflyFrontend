import { useContext, useEffect, useState } from 'react'
import styles from './Table.module.css'
import api from 'api'
import { UserContext } from 'context/UserContext'

export default function Table() {
    const [ dropdownStatus, setDropdownStatus ] = useState([false, false])
    const [ counter, setCounter ] = useState(0)
    const { readUser } = useContext(UserContext)
    const user = readUser().email
    const [ projects, setProjects ] = useState([])

    useEffect(() => {
        api.post('/projetos', user).then((res) => {
            setProjects(res.data)
        }).catch(e => console.log(e))
    }, [])

    useEffect(() => {

    }, [ counter ])

    function dropdown(e) {
        e.preventDefault()
        const projectId = e.target.id

        let dropdownUpdated = dropdownStatus

        for (let p in dropdownUpdated) {
            if (dropdownUpdated[p] === true && p !== projectId) {
                dropdownUpdated[p] = false
            }
        }

        dropdownUpdated[projectId] === true ? dropdownUpdated[projectId] = false : dropdownUpdated[projectId] = true

        setDropdownStatus(dropdownUpdated)
        setCounter(counter + 1)
    }

    return (
        <div className={ styles.taskTable }>
            <table className={ styles.table}>
                <thead>
                    <tr>
                        <th>Projetos</th>
                    </tr>
                </thead>
                <tbody>
                    { projects.map((project, index) => (
                        <tr id={index } key={ index }>
                            <td>
                                <button className={ dropdownStatus[index] ? styles.actived : '' } id={index} onClick={e => dropdown(e)  }>
                                    { project.name }
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z"/></svg>
                                </button>
                                <div className={ `${dropdownStatus[index] ? styles.actived : ''} ${ styles.dropdownDiv }`}>
                                <table className={ styles.tableSec }>
                                    <tbody>
                                        { project.tasks.map((task, index2) => (
                                            <tr key={ `task${index2}` }>
                                                {console.log(task)}
                                                <td className={ styles.tasks }>{ task.name }</td>
                                            </tr>
                                        )) }
                                    </tbody>
                                </table>
                            </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}   