import { NavLink } from 'react-router-dom'
import styles from './LPHeader.module.css'

export default function LPHeader() {
    return (
        <header className={ styles.header }>
            <nav>
                <ul>
                    <li>
                        <img src="./images/logo.png" alt="Logo do projeto" />
                    </li>
                    <li>
                        <NavLink to="/registrar">Criar conta</NavLink>
                    </li>
                </ul>
            </nav>
            <div className={ styles.text }>
                <h1>Administre tudo que precisa em um só lugar</h1>
                <h4>Organize todos os seus projetos por meio do nosso software de gestão personalizada</h4>
            </div>
            <img className={ styles.mockup } src="./images/LP/mockup1.png" alt="" />
        </header>
    )
}