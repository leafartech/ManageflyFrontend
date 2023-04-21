import Botao from 'components/Botao'
import styles from './TableFilter.module.css'
import api from 'api'
import { UserContext } from 'context/UserContext'
import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { NotificationContext } from 'context/NotificationContext'

export default function TableFilter({ filter, title, subtitle, btnText, path }) {
    const [ tbody, setTbody] = useState([])
    const { readUser } = useContext(UserContext)
    const [ dropdownStatus, setDropdownStatus ] = useState([])
    const [ counter, setCounter ] = useState(0)
    const user = readUser().email
    const { updateNotification } = useContext(NotificationContext)


    useEffect(() => {
        api.post('/projetos/', user).then(res => {
            setTbody(res.data)
            setDropdownStatus(Object.keys(res.data))
        }).catch(e => console.log(e))
    }, [user])

    function dropdown(e) {
        const id = e.target.id

        let verify = dropdownStatus
        for (let p in verify) {
            if (verify[p] === true) {
                verify[p] = false
            }
        }

        setDropdownStatus(verify)

        let updated = dropdownStatus
        updated[id] = true

        setDropdownStatus(updated)
        setCounter(counter + 1)
    }

    function inputOut(e) {
        let verify = dropdownStatus
        for (let p in verify) {
            if (verify[p] === true) {
                verify[p] = false
            }
        }

        setTimeout(() => {
            setDropdownStatus(verify)
            setCounter(counter + 1)
        }, "100")
    }

    function exclude(e) {
        const id = e.target.id
        const data = new URLSearchParams()
        data.append("projectId", id)
        data.append("user", user)
        
        api.post('/projetos/excluir', data).then(() => {
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

            let formated = `${day}/${month} - ${date.getHours()}:${minutes}`
            updateNotification(["excludeProject", formated, tbody[id].name, id])

            return
        }).catch(e => console.log(e))
        window.location.reload()
    }

    return (
        <table className={ styles.filterTable }>
            <tbody>
                <tr className={ styles.fields }>
                    <td>Projeto</td>
                    <td className={ styles.responsive }>Cliente</td>
                    <td className={ styles.responsive }>Valor</td>
                    <td>Ações</td>
                </tr>
                { tbody.length > 0 ? 
                    tbody.map((tr, index) => (
                        <tr className={ styles.map } key={index}>
                            <td style={{ color: 'var(--primary-color)' }}>
                                { tr.status === "ativo" ? <span className={ styles.actived }></span> : ''}
                                { tr.status === "encerrado" ? <span className={ styles.noActived }></span> : ''}
                                { tr.status === "completo" ? <span className={ styles.completed }></span> : ''}
                                { tr.name }
                            </td>
                            {tr.client !== 'undefined' ? 
                            <td className={ styles.responsive }>{ tr.client }</td> : <td className={ styles.responsive }>----</td>
                            }
                            <td style={{ color: 'green' }} className={ styles.responsive }>R${ (parseInt(tr.valor)).toLocaleString('pt-BR') }</td>
                            { filter ? 
                            <td className={ styles.acts } onBlur={ event => inputOut(event) }>
                                <button id={index} onClick={e => dropdown(e)  } className={ styles.dropdown }>
                                    <svg xmlns="http://www.w3.org/2000/svg" id={index} data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512">
                                        <circle id={index} cx="12" cy="2.5" r="2.5"/>
                                        <circle id={index} cx="12" cy="12" r="2.5"/>
                                        <circle id={index} cx="12" cy="21.5" r="2.5"/></svg>
                                </button>
                                <div className={ `${styles.dropdownDiv} ${ dropdownStatus[index] === true ? styles.dropdownActived : '' }` }>
                                    <span>
                                        <NavLink to={ `/projetos/:${index+1}` }>
                                            Detalhes
                                            <svg id="Layer_1" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m17 14a1 1 0 0 1 -1 1h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1zm-4 3h-5a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2zm9-6.515v8.515a5.006 5.006 0 0 1 -5 5h-10a5.006 5.006 0 0 1 -5-5v-14a5.006 5.006 0 0 1 5-5h4.515a6.958 6.958 0 0 1 4.95 2.05l3.484 3.486a6.951 6.951 0 0 1 2.051 4.949zm-6.949-7.021a5.01 5.01 0 0 0 -1.051-.78v4.316a1 1 0 0 0 1 1h4.316a4.983 4.983 0 0 0 -.781-1.05zm4.949 7.021c0-.165-.032-.323-.047-.485h-4.953a3 3 0 0 1 -3-3v-4.953c-.162-.015-.321-.047-.485-.047h-4.515a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3z"/></svg>
                                        </NavLink>
                                    </span>
                                    <span>
                                        <button id={index} onClick={ e => exclude(e) }>
                                            Excluir
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
                                        </button>
                                    </span>
                                </div>
                            </td>
                            
                            : 
                                <td className={ styles.inicio }>
                                    <NavLink to={ `/projetos/:${index+1}` }>
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M7,24a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l8.17-8.17a3,3,0,0,0,0-4.24L6.29,1.71A1,1,0,0,1,7.71.29l8.17,8.17a5,5,0,0,1,0,7.08L7.71,23.71A1,1,0,0,1,7,24Z"/></svg>
                                    </NavLink>
                                </td>
                            }
                        </tr>
                    )) 
                :
                    <div className={ styles.noData }>
                        <img src="../images/new.png" alt={ title } />
                        <div>
                            <h3>{ title }</h3>
                            <p>{ subtitle }</p>
                            <Botao to={ path }>{ btnText }</Botao>
                        </div>
                    </div>
                }
            </tbody>
        </table>
    )
}