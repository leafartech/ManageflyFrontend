import ForControl from 'components/FormControl'
import styles from './Register.module.css'
import { useContext, useEffect, useState } from 'react'
import api from 'api'
import { NavLink, useNavigate } from 'react-router-dom'
import Message from 'components/Message'
import { UserContext } from 'context/UserContext'
import { NotificationContext } from 'context/NotificationContext'

const Registrar = () => {
    const { userLogin } = useContext(UserContext)
    const { notificationLogin } = useContext(NotificationContext)
    const [ form, setForm] = useState({})
    const [ message, setMessage ] = useState('')
    const [ counter, setCounter ] = useState(0)
    const [ error, setError ] = useState(false)
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState()
    const [ success, setSuccess ] = useState(false)
    const [ loadingMessage, setLoadingMessage ] = useState('')

    useEffect(() => {
    }, [ counter ])

    function inputChange(event) {
        const {name, value} = event.target

        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))

        if (name === "name") setName(value)
        if (name === "email") setEmail(value)
        if (name === "password") setPassword(value)
    }

    const navegar = useNavigate()
    
    function formSubmited(event) {
        event.preventDefault();
    
        //Uso esse URLSearchParams para passar os dados do Forms no formato que o Body-parser entenda
        const data = new URLSearchParams();
        data.append("name", form.name);
        data.append("email", form.email);
        data.append("password", form.password);

        api.post('/registrar', data).then((res) => {
            if (res.data.errors) {
                setMessage(res.data)
                setError(true)
                setCounter(counter + 1)
            } else {
                setError(false)
                setMessage('Sua conta foi criada com sucesso!')
                setName('')
                setEmail('')
                setPassword('')
                setSuccess(true)
                userLogin(res.data)
                notificationLogin([])
                setTimeout(() => {
                    setLoadingMessage('Estamos preparando o seu ambiente!')
                }, "1000")
                setTimeout(() => {
                    setLoadingMessage('Quase lá...')
                }, "4000")
                setTimeout(() => {
                    navegar("/")
                }, "6000")
            }
        }).catch(error => console.log(error))
    }
    
    return (
        <main className={ styles.register }>
            <div className={ styles.container }>
                <form className={ `${styles.form} ${success ? styles.successForm : ''}` } method="post" action="/registrar">
                    <Message text={ message } error={ error } />
                    <div>
                        <div className={`${styles.spinner} ${styles.center} ${ success ? styles.success : ''}`}>
                            <div className={`${styles.spinnerBlade}`}></div>
                            <div className={`${styles.spinnerBlade}`}></div>
                            <div className={`${styles.spinnerBlade}`}></div>
                            <div className={`${styles.spinnerBlade}`}></div>
                            <div className={`${styles.spinnerBlade}`}></div>
                            <div className={`${styles.spinnerBlade}`}></div>
                            <div className={`${styles.spinnerBlade}`}></div>
                            <div className={`${styles.spinnerBlade}`}></div>
                            <div className={`${styles.spinnerBlade}`}></div>
                            <div className={`${styles.spinnerBlade}`}></div>
                            <div className={`${styles.spinnerBlade}`}></div>
                            <div className={`${styles.spinnerBlade}`}></div>
                        </div>
                    { success ? <p className={ styles.paragraph }>{loadingMessage}</p>: ''}
                    </div>
                    
                    <h2>Cadastro de usuário</h2>
                    <ForControl 
                        aoAlterado={(event) => inputChange(event)}
                        inptId="nome"
                        label="Nome:"
                        name="name"
                        placeholder="Rafael Borges"
                        type="text"
                        valor={name}
                    />
                    <ForControl 
                        aoAlterado={(event) => inputChange(event)}
                        inptId="email"
                        label="E-mail:"
                        name="email"
                        placeholder="exemplo@hotmail.com"
                        type="email"
                        valor={email}

                    />
                    <ForControl 
                        aoAlterado={(event) => inputChange(event)}
                        inptId="senha"
                        label="Senha:"
                        name="password"
                        placeholder="********"
                        type="password"
                        valor={password}
                    />

                    <button onClick={ event => formSubmited(event) } className={ styles.botao } type="submit">Enviar</button>
                    <NavLink className={ styles.bottomLink } to="/entrar">já possui uma conta?</NavLink>
                </form>
            </div>
        </main>
    )
}

export default Registrar