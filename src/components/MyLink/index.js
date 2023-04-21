import styles from './Link.module.css'
import { NavLink } from 'react-router-dom'

const MyLink = ({children, to}) => {
    return (
        <NavLink to={to} className={ styles.link }>
        {({ isActive, isPending }) => (
          <>{children}</>
        )}
      </NavLink>
    )
}

export default MyLink