import { useContext, useEffect, useState } from 'react'
import styles from './Chart.module.css'
import api from 'api'
import { UserContext } from 'context/UserContext'
import Info from 'components/info'
import TableFinancas from 'components/TableFinancas'

export default function Chart() {
    const [finance, setFinance ] = useState([])
    const [ income, setIncome ] = useState(0)
    const [ expense, setExpense ] = useState(0)
    const [ profit, setProfit ] = useState(0)
    const { readUser } = useContext(UserContext)
    const [ counter, setCounter ] = useState(0)
    const user = readUser().email

    useEffect(() => {
        api.post('/financas', user).then(res => {
            setFinance(res.data)
            setCounter(counter + 1)
        }).catch(e => console.log(e))
    }, [])
    
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

    return (
        <>
            <div className={ styles.flexRow }>
                <Info bg="#9300FF" img="./images/financas/dol.png" main={ income } text="Receita total" />
                <Info bg="#F26C0C" img="./images/financas/wallet.png" main={ expense } text="Gastos total" />
                <Info col={true} bg="#9CF0BD" img="./images/financas/money.png" main={ profit } text="Lucro total" />
            </div>
            <TableFinancas />
        </>
    )
}