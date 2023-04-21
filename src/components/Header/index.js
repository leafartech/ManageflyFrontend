import styles from './Header.module.css'
import MenuLink from 'components/MenuLink'

export default function Header({ notificationActived }) {
    return (
        <header className={ styles.header }> 
            <MenuLink notificationActived={ notificationActived } />
        </header>
    )
}