import ForControl from 'components/FormControl'
import styles from './Entrar.module.css'
import { useEffect, useState, useContext } from 'react'
import api from 'api'
import { NavLink, useNavigate } from 'react-router-dom'
import Message from 'components/Message'
import { UserContext } from 'context/UserContext'
import { NotificationContext } from 'context/NotificationContext'

const Entrar = () => {
    const { userLogin } = useContext(UserContext)
    const { notificationLogin } = useContext(NotificationContext)

    const [ form, setForm] = useState({})
    const [ message, setMessage ] = useState('')
    const [ counter, setCounter ] = useState(0)
    const [ error, setError ] = useState(false)

    useEffect(() => {
    }, [ counter ])

    function inputChange(event) {
        const {name, value} = event.target

        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const navegar = useNavigate()

    function handleForm(event) {
        event.preventDefault();
        
        //Uso esse URLSearchParams para passar os dados do Forms no formato que o Body-parser entenda
        const data = new URLSearchParams();
        data.append("email", form.email);
        data.append("password", form.password);

        api.post('/entrar', data).then((res) => {
            if (res.data.name === undefined) {
                setMessage(res.data)
                setError(true)
                setCounter(counter + 1)
            } else {
                setError(false)
                setMessage('Você entrou na sua conta com sucesso!')
                userLogin(res.data)
                if (res.data.notifications) {
                    notificationLogin([...res.data.notifications])
                } else {
                    notificationLogin([])
                }
                setTimeout(() => {
                    navegar("/")
                }, "3000")
            }
        }).catch(error => console.log(error))
    }
    return (
        <main className={ styles.entrar }>
            <div className={ styles.container}>
                <form className={styles.form} method="post">
                    <Message text={ message } error={ error } />

                    <h2>Entrar</h2>
                    <ForControl 
                        aoAlterado={(event) => inputChange(event)}
                        inptId="email"
                        label="E-mail:"
                        name="email"
                        placeholder="exemplo@hotmail.com"
                        type="email"
                    />
                    <ForControl 
                        aoAlterado={(event) => inputChange(event)}
                        inptId="Senha:"
                        label="Senha:"
                        name="password"
                        placeholder="***********"
                        type="password"
                    />
                    
                    <button onClick={ event => handleForm(event) } className={ styles.botao } type="submit">Entrar</button>
                    <NavLink className={ styles.bottomLink } to="/registrar">não possui uma conta?</NavLink>
                </form>
            </div>
        </main>
    )
}

export default Entrar