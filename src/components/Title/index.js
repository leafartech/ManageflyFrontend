import Botao from 'components/Botao'
import styles from './Title.module.css'

const Title = ({ title, subtitle, buttonPath, buttonText, colored }) => {
    return (
        <div className={ styles.title }>
            <h1>{ title} <span style={{ color: "var(--main-color)" }}>{ colored }</span></h1>
            <h4> {subtitle.charAt(0).toUpperCase() + subtitle.slice(1)} </h4>
            <Botao title={ true } to={ buttonPath }>{ buttonText }</Botao>
        </div>
    )
}

export default Title