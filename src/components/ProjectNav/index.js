import { NavLink } from 'react-router-dom'
import styles from './ProjectNav.module.css'

export default function ProjectNav({ length, id, url }) {
    return(
        <nav className={ styles.projectNav }>
            <NavLink to={`/projetos/${id.id}`}>
                <span className={`${url === 'tasks' ? 'actived' : ''}`}>Tarefas</span>
                <span className={ styles.badge }>{ length }</span>
            </NavLink>
            <NavLink to={ `/projetos/${id.id}/dados` }>
                <span className={ url === 'data' ? 'actived' : '' }>Dados</span>
            </NavLink>
        </nav>
    )
}