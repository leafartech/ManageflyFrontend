import Titles from 'components/Title'
import styles from './AcessoNegado.module.css'
import Back from 'components/Back'

export default function AcessoNegado() {
    return (
        <div className={ styles.acessoNegado }>
            <Titles title="Você não possui acesso a essa página" subtitle="Para acessá-la, crie uma conta ou efetue o login." />
            <Back path="/inicio" />
        </div>
    )
}