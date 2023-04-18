import styles from './LPList.module.css'

export default function LPList({ path, title, subtitle, size }) {
    return (
        <li className={ styles.heroList }>
            <img src={ path } alt={ title } className={ size ? styles.normal : '' } />
            <div className={ styles.text }>
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>
        </li>
    )
}