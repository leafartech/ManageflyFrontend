import { NavLink } from 'react-router-dom'
import styles from './Title.module.css'

export default function Title2({ text, path }) {
    return (
        <div className={ styles.title }>
            <h3>{ text }</h3>
            { path ? <NavLink to={path}>ver mais</NavLink> : '' }
        </div>
    )
}