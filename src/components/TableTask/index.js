import styles from './TableTask.module.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from 'context/UserContext'
import api from 'api'

export default function TableTask({ id, title, subtitle, btnText, modalForm }) {
    const projectId = id.replace(':', '')
    const [ project, setProject ] = useState([])
    const { readUser, modifyUser } = useContext(UserContext)
    const [ counter, setCounter ] = useState(0)
    const [ indexUpdated, setIndexUpdated ] = useState([])
    const updatedObject = project
    const user = readUser().email

    useEffect(() => {
        if (counter !== 0) {
            setProject(project)
        } else {
            api.post('/projetos/', user).then(res => {
                setProject(res.data)
            }).catch(e => console.log(e))
        }
    }, [user, counter])
    
    function changeSituacao(e) {
        e.preventDefault()
        
        let id = e.target.id
        let situacao = updatedObject[projectId-1].tasks[id].situacao
        
        if (situacao) {
            updatedObject[projectId-1].tasks[id].situacao = false
            modifyUser(projectId-1, id, false)
        } else {
            updatedObject[projectId-1].tasks[id].situacao = true
            modifyUser(projectId-1, id, true)
        }
        setProject(updatedObject)
        setCounter(counter + 1)
        
        if (Object.keys(indexUpdated).length > 0 && Object.keys(indexUpdated).includes(id)) {
            setIndexUpdated((prevState) => ({
                ...prevState,
                [id]: ''
            }))
        } else {
            setIndexUpdated((prevState) => ({
                ...prevState,
                [id]: id
            }))
        }
    }

    function save(e) {
        //Disparar quando a pessoa clicar em salvar
        const keys = Object.values(indexUpdated)
        for (let p in keys) {
            if (keys[p] === '') keys.splice(keys.indexOf(keys[p]), 1)
        }
        if (indexUpdated.length <= 0 || keys.length <= 0) {
            //
        } else {
            const data = new URLSearchParams();
            const id = (e.target.id).replace(':', '')
    
            data.append("tasksUpdated", keys)
            data.append("user", user)
            data.append("id", id)

            api.post('/projetos/' + id.id + '/atualizar', data).then(res => {
                ''
            }).catch(e => console.log(e))
        }
    }

    return (
        <table className={ styles.table }>
            <thead>
                <tr>
                    <th>Check</th>
                    <th>Tarefa</th>
                    <th className={ styles.responsive }>Prazo</th>
                    <th>
                        <button className={ styles.saveTasks } id={ id } onClick={ e => save(e) }>salvar</button>
                    </th>
                </tr>
            </thead>
                { project[projectId-1] !== undefined ? 
                    <tbody>
                    { project[projectId-1].tasks.map((task, index) => (
                        <tr key={ index }>
                            <td className={ `${task.situacao ? styles.checked : ''} act`}>
                                <form method="post" action="/projetos">
                                    <button id={ index } onClick={e => changeSituacao(e) }>
                                        <img src="../images/check.png" id={index} alt="" />
                                    </button>
                                </form>
                            </td>
                            <td>{ task.name }</td>
                            <td className={ styles.responsive }>
                                { task.deadline.slice(8, 10)}/{ task.deadline.slice(5, 7) }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                : 
                <div className={ styles.noData }>
                    <img src="../images/new.png" alt={ title } />
                    <div>
                        <h3>{ title }</h3>
                        <p>{ subtitle }</p>
                        <button onClick={e => modalForm(e) } className={ styles.botao }>{ btnText }</button>
                    </div>
                </div>
                }   
        </table>
    )
}