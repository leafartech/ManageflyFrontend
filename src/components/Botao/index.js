import { NavLink } from 'react-router-dom'
import styles from './Botao.module.css'

export default function Botao({to, children, title}) {
    if (!to) {
        return ''
    }
    if (title) {
        return (
            <NavLink className={ styles.botao } to={to}>{ children }</NavLink>
        )
    } else {
        return (
           <NavLink className={ styles.botaoNormal } to={to}>{ children }</NavLink>
        )
    }
}