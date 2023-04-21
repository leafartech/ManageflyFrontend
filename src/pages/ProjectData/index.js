import Template from 'components/Template'
import styles from './index.module.css'
import Header from 'components/Header'
import Container from 'components/Container'
import Back from 'components/Back'
import Title from 'components/Title'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from 'context/UserContext'
import { useParams } from 'react-router-dom'
import api from 'api'
import ProjectNav from 'components/ProjectNav'
import ProjectDataForm from 'components/ProjectDataForm'
import AcessoNegado from 'pages/AcessoNegado'

export default function ProjectData() {
    const { readUser } = useContext(UserContext)
    const id = useParams()
    const index = id.id.replace(':', '') - 1
    const [ project, setProject ] = useState([])
    const [ tasks, setTasks ] = useState([])

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

    if (error2) {
        return <AcessoNegado />
    }

    return (
        <Template>
            <Header />
            <Container bg={ true }>
                <Back path="/projetos" />
                { project.length > 0 && project[index] !== [] ? 
                    <div style={{ position: 'relative', width: '100%' }}>
                        <Title title={project[index].name} subtitle={project[index].status} />
                    </div>
                : ''}
                    <div className={ styles.data }>
                        <ProjectNav id={ id } length={ tasks.length } url="data" />
                        <ProjectDataForm />
                    </div>
            </Container>
        </Template>
    )
}