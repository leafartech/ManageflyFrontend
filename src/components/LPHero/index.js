import { NavLink } from 'react-router-dom'
import styles from './LPHero.module.css'

export default function LPHero({ side, children, path, title }) {

    if (side) {
        return (
            <div className={ `${styles.hero} ${ styles[side] }` }>
                <div className={ styles.text }>
                    {children}
                    <NavLink to="/registrar">Criar conta gratuita</NavLink>
                </div>
                <div className={ styles.imgDiv }>
                    <img src={ path } alt={ title } />
                </div>
            </div>
        )
    }

    return (
        <div className={ `${styles.hero} ${ styles[side] }` }>
            <div className={ styles.imgDiv }>
                <img src={ path } alt={ title } />
            </div>
            <div className={ styles.text }>
                {children}
                <NavLink to="/registrar">Criar conta gratuita</NavLink>
            </div>
        </div>
    )
}