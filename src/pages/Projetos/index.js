import Template from 'components/Template'
import styles from './Projetos.module.css'
import Header from 'components/Header'
import Container from 'components/Container'
import Title from 'components/Title'
import TableFilter from 'components/TableFilter'
import { useContext } from 'react'
import { UserContext } from 'context/UserContext'
import AcessoNegado from 'pages/AcessoNegado'

export default function Projetos() {
    const { readUser } = useContext(UserContext)

    let user = readUser()
    let error = false
    if (user === undefined) {
        error = true
    } else {
        user = user.email
    }
    
    if (error) {
        return <AcessoNegado />
    }

    return (
        <Template>
            <Header notificationActived={true}/>
            <Container>
                <Title title="Projetos" subtitle="Acompanhe o andamento dos seus projetos, assim como as suas respectivas tarefas." buttonPath="/projetos/criar" buttonText="Criar projeto" />
                <section className={ styles.projetos }>
                    <TableFilter btnText="Criar meu primeiro projeto" path="/projetos/criar" title="Você ainda não criou projetos" subtitle="Os projetos são o coração do seu negócio... e você vai ver como é simples criar!
Basta clicar no botão abaixo e começar a fazer dinheiro :)" filter={ true } />
                </section>
            </Container>
        </Template>
    )

}