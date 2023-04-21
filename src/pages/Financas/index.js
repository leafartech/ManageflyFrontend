import Template from 'components/Template'
import styles from './Financas.module.css'
import Header from 'components/Header'
import Container from 'components/Container'
import Title from 'components/Title'
import Chart from 'components/Chart'
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from 'context/UserContext'
import api from 'api'
import AcessoNegado from 'pages/AcessoNegado'
import { NotificationContext } from 'context/NotificationContext'

export default function Financas() {
    const [ modal, setModal ] = useState(false)
    const [ valor, setValor ] = useState('')
    const [ type, setType ] = useState("Entrada")
    const [id, setId ] = useState('')
    const [ date, setData ] = useState('')
    const { readUser } = useContext(UserContext)
    const { updateNotification } = useContext(NotificationContext)
    const [ message, setMessage ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ title, setTitle ] = useState('Registrar movimentação')
    
    let user = readUser()
    let error2 = false
    if (user === undefined) {
        error2 = true
    } else {
        user = user.email
    }

    function close() {
        setModal(false)
    }
    function inputChange(e) {
        const { name, value } = e.target

        if (name === "id") setId(value)
        if (name === "valor") setValor(value)
        if (name === "type") setType(value)
        if (name === "data") setData(value)
    }
    function formSubmited(e) {
        e.preventDefault()

        const data = new URLSearchParams()
        data.append("user", user)
        data.append("tipo", type)
        data.append("id", id)
        data.append("valor", valor)
        data.append("data", date)

        api.post("/financas/registrar", data).then((res) => {
            if (res.data.length > 0 ) {
                setError(true)
                console.log(res.data)
                setMessage(...res.data)
            } else {
                setError(false)
                setMessage(true)
                setTitle("Movimentação registrada")
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
                updateNotification(["newFinance", formated, valor, type])
                setTimeout(() => {
                    window.location.reload()
                }, "2000")
            }
        }).catch(e => console.log(e))
    }
    function modalForm() {
        setModal(true)
    }

    if (error2) {
        return <AcessoNegado />
    }

    return (
        <Template>
            <Header notificationActived={ true }/>
            <Container>
                <div style={{ position: 'relative', width: '100%' }}>
                    <Title subtitle="Acompanhe os resultados dos seus projetos" title="Finanças"/>
                    <button onClick={e => modalForm(e) } className={ styles.botao }>Registrar movimentação</button>
                </div>
                <Chart />
            </Container>
            { modal ? 
                <div className={ styles.modal }>
                    <div onClick={ close } className={ styles.bg }></div>
                    <form className={ `${styles.forms } ${ message === true ? styles.hidInputs : ''  }`}>
                        <div className={ styles.close } onClick={ close }>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M13.93,12L21.666,2.443c.521-.644,.422-1.588-.223-2.109-.645-.522-1.588-.421-2.109,.223l-7.334,9.06L4.666,.557c-1.241-1.519-3.56,.357-2.332,1.887l7.736,9.557L2.334,21.557c-.521,.644-.422,1.588,.223,2.109,.64,.519,1.586,.424,2.109-.223l7.334-9.06,7.334,9.06c.524,.647,1.47,.742,2.109,.223,.645-.521,.744-1.466,.223-2.109l-7.736-9.557Z"/></svg>
                        </div>
                        <h2>
                            <img src="../../images/Acts/money.png" alt="Nova tarefa" />{ title }
                        </h2>
                        <div className={ styles.formControl }>
                            <label htmlFor="name">Tipo:*</label>
                            <div className={ styles.radio }>
                                <div>
                                    <label htmlFor="entrada">Entrada</label>
                                    <input type="radio" id="entrada" name="type" onChange={e => inputChange(e)} value="Entrada" defaultChecked />
                                </div>
                                <div>
                                    <label htmlFor="saida">Saída</label>
                                    <input type="radio" id="saida" name="type" onChange={e => inputChange(e)} value="Saida" />
                                </div>
                            </div>
                        </div>
                        <div className={ styles.formControl }>
                            <label htmlFor="id">Identificação*</label>
                            <input type="text" placeholder="Praia" id="id" name="id" value={ id } onChange={e => inputChange(e)} />
                        </div>
                        <div className={ styles.formControl }>
                            <label htmlFor="valor">Valor*</label>
                            <div className={ styles.valor }>
                                <h6>R$</h6>
                                <input min="1" placeholder="3000" type="number" value={ valor } name="valor" id="valor" onChange={e => inputChange(e)} />
                            </div>
                        </div>
                        <div className={ styles.formControl }>
                            <label htmlFor="data">Data*</label>
                            <input type="date" value={ date } name="data" id="data" onChange={e => inputChange(e)} />
                        </div>
                        <button onClick={ e => formSubmited(e) }>Salvar registro</button>
                        { error ? 
                            <div className={ styles.error}>
                                { message }
                            </div>
                        : 
                            message ? 
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
                            : ''   
                        }
                    </form>
                </div>
            : ''
            }
        </Template>
    )
}