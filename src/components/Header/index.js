import styles from './Header.module.css'
import MenuLink from 'components/MenuLink'

export default function Header({ bg }) {
    return (
        <header className={ styles.header }> 
            <MenuLink bg={ bg } />
        </header>
    )
}