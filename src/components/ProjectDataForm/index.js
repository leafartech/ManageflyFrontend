import styles from './ProjectDataForm.module.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from 'context/UserContext'
import { useParams } from 'react-router-dom'
import api from 'api'

export default function ProjectDataForm() {
    const { readUser } = useContext(UserContext)
    const user = readUser().email
    const id = useParams()
    const [ updatedTasks, setUpdatedTasks ] = useState([])
    const index = id.id.replace(':', '') - 1
    const [ projects, setProjects ] = useState([]) //Todos projetos
    const [ name, setName ] = useState('')
    const [ status, setStatus ] = useState('')
    const [ area, setArea ] = useState('')
    const [ client, setClient ] = useState('')
    const [ valor, setValor ] = useState('')
    const [ desc, setDesc ] = useState(' ')
    const [ start, setStart ] = useState('')
    const [ finish, setFinish ] = useState('')
    const [ tasks, setTasks ] = useState([])
    const [ clientPossible, setClientePossible ] = useState(false)
    const [counter, setCounter ] = useState(0)
    const [counterSec, setCounterSec ] = useState(0)
    const [ dropdown, setDropdown] = useState(false)
    const [ form, setForm ] = useState({})
    const [ indexUpdated, setIndexUpdated ] = useState([])
    const [ error, setError ] = useState(false)
    const [ message, setMessage ]= useState(false)

    useEffect(() => {
        api.post('/projetos/' + id.id, user).then(res => {
            setProjects(res.data)
            setCounter(counter+1)
        }).catch(e => console.log(e))
    }, [user, id])

    useEffect(() => {
        if (projects.length > 0) {
            setName(projects[index].name)
            setStatus(projects[index].status)
            setArea(projects[index].area)
            projects[index].area === "pessoal" ? setClientePossible(false) : setClientePossible(true)
            setClient(projects[index].client)
            setValor(projects[index].valor)
            setDesc(projects[index].desc)
            setStart(projects[index].start)
            setFinish(projects[index].finish)
            setTasks(projects[index].tasks)
            setUpdatedTasks(projects[index].tasks)

            setForm({
                name: projects[index].name,
                status: projects[index].status,
                area: projects[index].area,
                client: projects[index].client,
                valor: projects[index].valor,
                start: projects[index].start,
                finish: projects[index].finish,
                tasks: projects[index].tasks,
            })
        }
    }, [counter])

    useEffect(() => {
    }, [ counterSec ])

    function onChange(e) {
        const {name, value} = e.target

        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))

        if (name === 'name') setName(value)
        if (name === 'status') setStatus(value)
        if (name === 'area') setArea(value)
        if (name === 'area' && value === "work") setClientePossible(true)
        if (name === 'area' && value === "pessoal") setClientePossible(false)
        if (name === 'client') setClient(value) 
        if (name === 'valor') setValor(value)
        if (name === 'desc') setDesc(value)
        if (name === 'start') setStart(value)
        if (name === 'finish') setFinish(value)
    }

    function formSubmited(e) {
        e.preventDefault()

        setError(false)

        if (name.length === 0) {setError(true); console.log('aq1')}
        if (status !== "ativo" && status !== "encerrado" && status !== "completo") {setError(true); console.log('aq2')}
        if (parseInt(valor) <= 0) {setError(true); console.log('aq4')}
        
        if (error === false) {
            const data = new URLSearchParams()
            data.append("user", user)
            data.append("projectId", index)
            data.append("name", form.name)
            data.append("area", form.area)
            data.append("client", form.client)
            data.append("valor", form.valor)
            data.append("tasks", Object.values(indexUpdated))
            data.append("desc", form.desc)
            data.append("start", form.start)
            data.append("finish", form.finish)
            data.append("status", form.status)
    
            api.post('/projetos/' + id.id + '/dados', data).then(() => {
                console.log('post has been sent!')
            }).catch(e => console.log(e))
        }
        setMessage(true)
    }

    function dropdownControl() {
        setDropdown(!dropdown)
    }

    function removeTask(e) {
        e.preventDefault()

        const id = e.target.id
        updatedTasks.splice(id, 1)
        setUpdatedTasks(updatedTasks)

        setIndexUpdated((prevState) => ({
            ...prevState,
            [id]: id
        }))

        setTasks(updatedTasks)
        setCounterSec(counterSec+1)
    }

    return (
        projects.length > 0 ? 
        <form className={ styles.projectDataForm } method="post">
            {message ? 
                error ? 
                    <div className={ styles.error }>
                        <p>Campos com * precisam ser preenchidos corretamente!</p>
                    </div>
                : 
                    <div className={ styles.success }>
                        <p>Os dados foram atualizados!</p>
                    </div>
            
            : ''
            }
            <button className={ styles.botaoF }  onClick={e => formSubmited(e) }>Salvar</button>
            <div className={ styles.formField }>
                <div className={ styles.text }>
                    <h3>Nome do projeto*</h3>
                </div>
                <input type="text" name="name" placeholder="Managefly" onChange={e => onChange(e)} value={ name }  />
            </div>
            <div className={ styles.formField }>
                <div className={ styles.text }>
                    <h3>Status*</h3>
                </div>
                <select name="status" onChange={e => onChange(e)}>
                    <option value={ status }>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                    { status === "ativo" ? <option value={"encerrado"}>Encerrar</option> : ''}
                    { status === "ativo" ? <option value={"completo"}>Completar</option> : ''}
                    { status === "encerrado" ? <option value={"ativo"}>Ativar</option> : ''}
                    { status === "encerrado" ? <option value={"completo"}>Completar</option> : ''}
                    { status === "completo" ? <option value={"ativo"}>Ativar</option> : ''}
                    { status === "completo" ? <option value={"encerrado"}>Encerrar</option> : ''}
                </select>
            </div>
            <div className={ styles.formField }>
                <div className={ styles.text }>
                    <h3>Área*</h3>
                </div>
                <div className={ styles.radio }>
                    { area === "pessoal" ?
                    <>
                        <div>
                            <label htmlFor="pessoal">Pessoal</label>
                            <input checked type="radio" name="area" id="pessoal" value="pessoal" onClick={e => onChange(e)}/>
                        </div>
                        <div>
                            <label htmlFor="trabalho">Trabalho</label>
                            <input type="radio" name="area" id="trabalho" value="work" onClick={e => onChange(e)}/>
                        </div>
                    </>
                    :  
                    <>
                        <div>
                            <label htmlFor="pessoal">Pessoal</label>
                            <input type="radio" name="area" id="pessoal" value="pessoal" onChange={e => onChange(e)}/>
                        </div>
                        <div>
                            <label htmlFor="trabalho">Trabalho</label>
                            <input checked type="radio" name="area" id="trabalho" value="work" onChange={e => onChange(e)}/>
                        </div>
                    </>
                    }
                </div>
            </div>
            <div className={ styles.formField }>
                <div className={ styles.text }>
                    <h3>Cliente</h3>
                </div>
                { clientPossible ? 
                <input type="text" name="client" placeholder="Identificação do cliente" value={ client } onChange={e => onChange(e)} />
                : 
                <input type="text" name="client" placeholder="Identificação do cliente" value="----" onChange={e => onChange(e)} />
                }
            </div>
            <div className={ styles.formField }>
                <div className={ styles.text }>
                    <h3>Valor*</h3>
                    <p>Valor mínimo de R$1</p>
                </div>
                <div className={ styles.min }>
                    <input value="R$" readOnly className={ styles.money } />
                    <input type="number" min="0" value={ valor } name="valor" placeholder="3.000" onChange={e => onChange(e)}/>
                </div>
            </div>
            <div className={ styles.formField }>
                <div className={ styles.text }>
                    <h3>Descrição</h3>
                    <p>Faça observações a respeito do objetivo desse trabalho. Ex:”Aumentar a visibilidade da empresa”</p>
                </div>
                <textarea cols="10" rows="5" name="desc" placeholder="Digite aqui" value={desc === 'undefined' ? '' : desc } onChange={e => onChange(e)}/>
            </div>
            <div className={ styles.formField }>
                <div className={ styles.text }>
                    <h3>Data de início</h3>
                </div>
                <input type="date" value={ start } name="start" onChange={e => onChange(e)}/>
            </div>
            <div className={ styles.formField }>
                <div className={ styles.text }>
                    <h3>Data de Término - Prazo</h3>
                </div>
                <input type="date" value={ finish } name="finish" onChange={e => onChange(e)}/>
            </div>
            <div className={ styles.formTasks } style={{ borderBottom: 'none' }}>
                <div>
                    <h3 className={ dropdown ? `${ styles.active }` : '' } onClick={dropdownControl}>   
                        Tarefas
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z"/></svg>
                    </h3>
                </div>
                <table className={ dropdown ? `${ styles.active }` : '' }>
                { tasks.length > 0 ? tasks.map((task, index) => (
                        <tbody>
                            <tr key={index}>
                                <td>{ task.name }</td>
                                <td>{ task.data }</td>
                                <td>{ task.situacao }</td>
                                <td>
                                    <button id={index}  onClick={ e => removeTask(e) }>
                                        <svg id={ index } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
                                            <path id={ index } d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/>
                                            <path id={ index } d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/>
                                            <path id={ index } d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))
                        : 'Você não possui tarefas'
                    }
                </table>
            </div>
            <button className={ styles.botao } onClick={e => formSubmited(e) }>Salvar</button>
        </form>
        : 
        ''
    )
}