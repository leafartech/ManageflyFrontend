import Container from 'components/Container'
import styles from './Inicio.module.css'
import Titles from 'components/Title'
import Header from 'components/Header'
import Template from 'components/Template'
import { UserContext } from 'context/UserContext'
import { useContext, useEffect, useState } from 'react'
import Title2 from 'components/Title2'
import Acts from 'components/acts'
import Info from 'components/info'
import TableFilter from 'components/TableFilter'
import api from 'api'
import AcessoNegado from 'pages/AcessoNegado'

const Inicio = () => {
    const [finance, setFinance ] = useState([])
    const [ income, setIncome ] = useState(0)
    const [ expense, setExpense ] = useState(0)
    const [ profit, setProfit ] = useState(0)
    const { readUser } = useContext(UserContext)
    const [ counter, setCounter ] = useState(0)
    
    let user = readUser()
    let error = false
    if (user === undefined) {
        error = true
    } else {
        user = user.email
    }

    useEffect(() => {
        api.post('/financas', user).then(res => {
            setFinance(res.data)
            setCounter(counter + 1)
        }).catch(e => console.log(e))
    }, [user, counter])
    
    useEffect(() => {
        let incomeHlp = 0
        let expenseHlp = 0
        finance.map((current) => {
            if (current.tipo === "Entrada") {
                incomeHlp += parseInt(current.valor)
            } else {
                expenseHlp += parseInt(current.valor)
            }
            return ''
        })
        setIncome(incomeHlp)
        setExpense(expenseHlp)
        setProfit(parseInt(income) - parseInt(expense))
    }, [ counter, expense, income, profit ])
    
    if (error) {
        return <AcessoNegado />
    }
    return (
    <Template>
        <Header />
        
        <Container>
            <Titles subtitle="It's not over until I win..." title="Que bom que está de volta," colored="vamos trabalhar?"/>
            <section className={ styles.inicio }>
                <Title2 path="" text="O que gostaria de fazer?" />
                <div className={ styles.flexRow }>
                    <Acts path="/projetos/criar" icon="./images/acts/project.png" text="Criar projeto"/>
                    <Acts path="/tarefas" icon="./images/acts/task.png" text="Visualizar tarefas"/>
                    <Acts path="/financas" icon="./images/acts/money.png" text="Registrar movimentação"/>
                </div>
            </section>
            <section className={ styles.inicio }>
                <Title2 path="/financas" text="Suas finanças"/>
                <div className={ styles.flexGrid }>
                    <Info bg="#9300FF" img="./images/financas/dol.png" main={ income } text="Receita total" />
                    <Info bg="#F26C0C" img="./images/financas/wallet.png" main={ expense } text="Gastos total" />
                    <Info col={ true } bg="#9CF0BD" img="./images/financas/money.png" main={ profit } text="Lucro total" />
                </div>
            </section>
            <section className={ styles.inicio }>
                <Title2 path="/projetos" text="Seus projetos" />
                <TableFilter btnText="Criar meu primeiro projeto" path="/projetos/criar" title="Você ainda não criou projetos" subtitle="Os projetos são o coração do seu negócio... e você vai ver como é simples criar!
Basta clicar no botão abaixo e começar a fazer dinheiro :)" filter={ false } />
            </section>
        </Container>
    </Template>
    )
}

export default Inicio