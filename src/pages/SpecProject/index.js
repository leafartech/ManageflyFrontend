import { useParams } from 'react-router-dom'
import styles from './SpecProject.module.css'
import api from 'api'
import { UserContext } from 'context/UserContext'
import { useContext, useEffect, useState } from 'react'
import Template from 'components/Template'
import Header from 'components/Header'
import Title from 'components/Title'
import Container from 'components/Container'
import Back from 'components/Back'
import TableTask from 'components/TableTask'
import ProjectNav from 'components/ProjectNav'
import AcessoNegado from 'pages/AcessoNegado'
import { NotificationContext } from 'context/NotificationContext'

export default function SpectProject() {
    const { readUser } = useContext(UserContext)
    const { updateNotification } = useContext(NotificationContext)
    const id = useParams()
    const index = id.id.replace(':', '') - 1
    const [ project, setProject ] = useState([''])
    const [ tasks, setTasks ] = useState([])
    const [ name, setName ] = useState('')
    const [ date, setDate ] = useState('')
    const [ modal, setModal ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ message, setMessage ] = useState('')

    let user = readUser()
    let error2 = false
    if (user === undefined) {
        error2 = true
    } else {
        user = user.email
    }

    useEffect(() => {
        api.post('/projetos/' + id.id, user).then(res => {
            setProject(res.data)
            setTasks(res.data[index].tasks)
        }).catch(e => console.log(e))
    }, [user, id])

    function modalForm(e) {
        setModal(true)
    }
    function close() {
        setModal(false)
    }

    function inputChange(event) {
        const {name, value} = event.target

        if (name === "name") setName(value)
        if (name === "date") setDate(value)
    }

    function formSubmited(event) {
        event.preventDefault();
        setError(false)
    
        //Uso esse URLSearchParams para passar os dados do Forms no formato que o Body-parser entenda
        const data = new URLSearchParams();


        if (name.length === 0) setError(true)
        if (date.length < 10) setError(true)

        data.append("name", name);
        data.append("deadline", date);
        data.append("user", user)

        api.post('/projetos/' + id.id + '/tarefa', data).then(res => {
            if (res.data.length > 0) {
                setError(true)
                setMessage(res.data[0])
            } else {
                setMessage('Sucesso')
                setName('')
                setDate('')

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

                let projectId = id.id.replace(':', '')

                let formated = `${day}/${month} - ${date.getHours()}:${minutes}`
                updateNotification(["newTask", formated, name, projectId])

                setTimeout(() => {
                    window.location.reload()
                }, "1000")
            }
        }).catch(e => console.log(e))
        
        
    }

    if (error2) {
        return <AcessoNegado />
    }

    return (
        <Template>
            <Header bg={ true } />
            <Container bg={ true }>
                <Back path="/projetos"/>
                { project[0] !== '' ? 
                    <div style={{ position: 'relative', width: '100%' }}>
                        <Title title={project[index].name} subtitle={project[index].status} />
                        <button onClick={e => modalForm(e) } className={ styles.botao }>Nova tarefa</button>
                    </div>
                    
                : ''
                }
                <div className={ styles.specificProject }>
                    <ProjectNav id={ id } length={ tasks.length } url="tasks" />

                    { tasks.length > 0 ? 
                        <TableTask 
                            modalForm={modalForm}
                            id={ id.id } 
                            btnText="Criar tarefa" 
                            title="Dê o primeiro passo" 
                            subtitle="Parece que você ainda não tem nenhuma tarefa para cumprir... Elas são a chave para o progresso dos seus projetos!" />
                        : 
                        <div className={ styles.noData }>
                            <img src="../images/new.png" alt="criar primeira tarefa" />
                            <div>
                                <h3>Dê o primeiro passo</h3>
                                <p>Parece que você ainda não tem nenhuma tarefa para cumprir...Elas são a chave para o progresso dos seus projetos!</p>
                                <button onClick={e => modalForm(e) } className={ styles.botao }>Criar tarefa</button>
                            </div>
                        </div>
                    }
                </div>
            </Container>
                {modal ? 
                    <div className={ styles.modal }>
                        <div onClick={ close } className={ styles.bg }></div>
                        <form method="" action="" className={ styles.forms }>
                            <div className={ styles.close } onClick={ close }>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M13.93,12L21.666,2.443c.521-.644,.422-1.588-.223-2.109-.645-.522-1.588-.421-2.109,.223l-7.334,9.06L4.666,.557c-1.241-1.519-3.56,.357-2.332,1.887l7.736,9.557L2.334,21.557c-.521,.644-.422,1.588,.223,2.109,.64,.519,1.586,.424,2.109-.223l7.334-9.06,7.334,9.06c.524,.647,1.47,.742,2.109,.223,.645-.521,.744-1.466,.223-2.109l-7.736-9.557Z"/></svg>
                            </div>
                            <h2>
                                <img src="../../images/Acts/task.png" alt="Nova tarefa" />Nova tarefa
                            </h2>
                            <div className={ styles.formControl }>
                                <label htmlFor="name">Nome:*</label>
                                <input type="text" id="name" value={ name } name="name" placeholder="Criar website moderno" required onChange={e => inputChange(e)} />
                            </div>
                            <div className={ styles.formControl }>
                                <label htmlFor="date">Prazo:*</label>
                                <input type="date" id="date" name="date" required onChange={e => inputChange(e)} />
                            </div>
                            <button onClick={ e => formSubmited(e) }>Adicionar tarefa</button>
                            { error ? 
                                <div className={ styles[error] }>{message}</div>
                            : ''}
                        </form>
                    </div>
                :
                ''
                }
        </Template>
    )
}