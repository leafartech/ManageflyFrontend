import { useState, useEffect } from 'react'
import styles from './Dados.module.css'
import api from 'api'

const Dados = () => {
    const [ users, setUSers ] = useState([])
    
    useEffect(() => {
        api.get('dados').then(res => {
            setUSers([...res.data])
        }).catch(e => console.log(e))

    }, [])

    console.log(users)
    return (
        <table className={ styles.table }>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Senha</th>
                </tr>
            </thead>
            <tbody>
                { users.map((user, key) => (
                    <tr key={key}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                    </tr>
                )) }
            </tbody>
        </table>
    )
}

export default Dados