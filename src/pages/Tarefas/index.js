import Header from "components/Header"
import Container from 'components/Container'
import Table from 'components/Table'
import './Task.css'
import Template from 'components/Template'
import AcessoNegado from 'pages/AcessoNegado'
import { UserContext } from 'context/UserContext'
import { useContext } from 'react'
import Title from 'components/Title'


const Tasks = () => {
    const { readUser } = useContext(UserContext)
    
    const user = readUser()

    if (user === undefined || user.length === 0) {
        return (
            <AcessoNegado />
        )
    } else {
        return (
            <Template>
                <Header notificationActived={true}/>
                <Container>
                    <div className="tarefas">
                        <Title title="Tarefas" subtitle="Clique no projeto desejado e confira rapidamente todas as suas respectivas tarefas." />
                        <Table />
                    </div>
                </Container>
            </Template>
        )
    }
}

export default Tasks