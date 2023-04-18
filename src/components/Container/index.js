import styles from './Container.module.css'

const Container = ({ children, bg }) => {
    return (
        <div className={ `${styles.container} ${bg ? styles.bg : ''}` }>
            {children}
        </div>
    )
}

export default Container