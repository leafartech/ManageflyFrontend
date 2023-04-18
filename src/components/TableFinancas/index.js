import { useContext, useEffect, useState } from 'react'
import styles from './TableFinancas.module.css'
import { UserContext } from 'context/UserContext'
import api from 'api'
import Botao from 'components/Botao'
import { NotificationContext } from 'context/NotificationContext'

export default function TableFinancas() {
    const { readUser } = useContext(UserContext)
    const { updateNotification } = useContext(NotificationContext)
    const [ financaData, setFinancaData ] = useState([])
    const user = readUser().email

    useEffect(() => {
        api.post('/financas', user).then(res => {
            setFinancaData(res.data)
        })
    }, [ user ])

    function deletar(e) {
        const id = e.target.id

        const data = new URLSearchParams()
        data.append("id", id)
        data.append("user", user)

        api.post('./financas/excluir', data).then((res) => {
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
            updateNotification(["excludeFinance", formated, financaData[id].id, financaData[id].valor])
            setFinancaData(res.data)
        }).catch(e => console.log(e))
    }

    return (
        <table className={ styles.financeTable }>
            <thead className={ styles.first }>
                <tr>
                    <th>Registro de movimentações</th>
                </tr>
            </thead>
            <thead className={ styles.middle }>
                <tr>
                    <th>Identificação</th>
                    <th>Valor</th>
                    <th className={ styles.responsive }>Data</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            <tbody>
                { financaData.length > 0 ?
                    financaData.map((item, index) => (
                        <tr key={index} className={ styles.map }>
                            <td>{item.id}</td>
                            <td className={ `${ styles.valor} ${item.tipo === "Entrada" ? styles.entrada : styles.saida}` }>R${parseInt(item.valor).toLocaleString('pt-BR')}</td>
                            <td className={ `${styles.data} ${styles.responsive}` }>{`${(item.data).slice(8, 10)}/${(item.data).slice(5, 7)}/${(item.data).slice(0, 4)}`}</td>
                            <td className={ styles.act }>
                                <button id={index}  onClick={ e => deletar(e) }>
                                    <svg id={ index } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
                                        <path id={ index } d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/>
                                        <path id={ index } d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/>
                                        <path id={ index } d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
                                </button>
                            </td>
                        </tr>
                    )) 
                    :
                    <div className={ styles.noData }>
                        <img src="../images/new.png" alt="sem movimentações" />
                        <div>
                            <h3>Ainda sem movimentações</h3>
                            <p>Registre a sua primeira movimentação para administrar facilmente suas finanças</p>
                            <Botao to="">Registrar movimentação</Botao>
                        </div>
                    </div>
                }
            </tbody>
        </table>
        // financaData.length > 0 ? 
        //     ''
        // :

    )
}