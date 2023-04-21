import Back from 'components/Back'
import styles from './ProjetosAdicionar.module.css'
import { useState, useContext, useEffect } from 'react'
import api from 'api'
import { UserContext } from 'context/UserContext'
import Message from 'components/Message'
import { useNavigate } from 'react-router-dom'
import { NotificationContext } from 'context/NotificationContext'
import AcessoNegado from 'pages/AcessoNegado'

export default function ProjetosAdicionar() {
    const { readUser } = useContext(UserContext)
    const { updateNotification } = useContext(NotificationContext)
    
    const [ form, setForm] = useState({})
    const [ area, setArea ] = useState('work')
    const [ name, setName ] = useState('')
    const [ valor, setValor ] = useState('')
    const [ client, setClient] = useState('')
    const [ message, setMessage ] = useState('')
    const [ error, setError ] = useState(false)
    const [ success, setSuccess] = useState(false)

    let user = readUser()
    let error2 = false
    if (user === undefined) {
        error2 = true
    } else {
        user = user.email
    }
    
    const [ counter, setCounter ] = useState(0)
    useEffect(() => {
    }, [ counter ])
    
    const navegar = useNavigate()
    
    function inputChange(event) {
        const {name, value} = event.target
    
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    
        if (name === "area") setArea(value)
        if (name === "name") setName(value)
        if (name === "client") setClient(value)
        if (name === "valor") setValor(value)
    }
    
    function formSubmited(event) {
        event.preventDefault();
    
        //Uso esse URLSearchParams para passar os dados do Forms no formato que o Body-parser entenda
        const data = new URLSearchParams();
        data.append("area", area)
        data.append("name", form.name);
        data.append("client", form.client);
        data.append("valor", form.valor);
        data.append("user", user)
        
        setName('')
        setValor('')
        setClient('')
    
        api.post('/projetos/criar', data).then((res) => {
            if (typeof res.data !== 'number') {
                setMessage(res.data)
                setError(true)
                setCounter(counter+1)
            } else {
                setMessage(false)   
                setSuccess(true)
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
                updateNotification(["newProject", formated, name, res.data])
                setTimeout(() => {
                    navegar(`/projetos/:${res.data}`)
                }, "5000")
            }
        }).catch(e => console.log(e))
    
    }
    
    if (error2) {
        return <AcessoNegado />
    }
    return (
        <div className={ styles.add }>
            <Back path={"/projetos"}/>
            <div className={ success ? styles.success : styles.dont }>
                <div className={`${styles.spinner} ${styles.center}`}>
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
            </div>
            <form method="post" action="/projetos/criar" className={ `${styles.forms} ${success ? styles.hid : ''}` }>
                <Message error={error} text={message}/>
                <h2>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M22.485,10.975,12,17.267,1.515,10.975A1,1,0,1,0,.486,12.69l11,6.6a1,1,0,0,0,1.03,0l11-6.6a1,1,0,1,0-1.029-1.715Z"/><path d="M22.485,15.543,12,21.834,1.515,15.543A1,1,0,1,0,.486,17.258l11,6.6a1,1,0,0,0,1.03,0l11-6.6a1,1,0,1,0-1.029-1.715Z"/><path d="M12,14.773a2.976,2.976,0,0,1-1.531-.425L.485,8.357a1,1,0,0,1,0-1.714L10.469.652a2.973,2.973,0,0,1,3.062,0l9.984,5.991a1,1,0,0,1,0,1.714l-9.984,5.991A2.976,2.976,0,0,1,12,14.773ZM2.944,7.5,11.5,12.633a.974.974,0,0,0,1,0L21.056,7.5,12.5,2.367a.974.974,0,0,0-1,0h0Z"/></svg>
                    Novo projeto
                </h2>
                <div className={ styles.formControl }>
                    <label>Área:*</label>
                    <div className={ styles.area }>
                        <div>
                            <label htmlFor="trabalho">Trabalho</label>
                            <input onChange={e => inputChange(e)} type="radio" id="trabalho" name="area" defaultChecked value="work"/>
                        </div>
                        <div>
                            <label htmlFor="pessoal">Pessoal</label>
                            <input onChange={e => inputChange(e)} type="radio" id="pessoal" name="area" value="pessoal" />
                        </div>
                    </div>
                </div>
                <div className={ styles.formControl }>
                    <label htmlFor="name">Nome:*</label>
                    <input type="text" id="name" value={ name } name="name" placeholder="Criar website moderno" required onChange={e => inputChange(e)} />
                </div>
                <div className={ styles.formControl }>
                    <label htmlFor="valor">Valor:*</label>
                    <div className={ styles.number }>
                        <h6>R$</h6>
                        <input min="1" type="number" required value={ valor } id="valor" name="valor" placeholder="3000" onChange={e => inputChange(e)} />
                    </div>
                </div>
                { area === "work" ? 
                <div className={ `${styles.formControl}` }>
                    <label htmlFor="client">Cliente:</label>
                    <input type="text" name="client" value={ client } onChange={e => inputChange(e)} placeholder="Jorge Pereira" />
                </div>
                :
                ''
                }
                <button onClick={ event => formSubmited(event) } className={ styles.botao } type="submit">Criar projeto</button>
            </form>
        </div>
    )
    
}