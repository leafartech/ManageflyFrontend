import styles from './Info.module.css'

export default function Info({ text, main, img, bg, col }) {
    return (
        <div className={ `${styles.info} ${ col ? styles.column : ''}` }>
            <div className={ styles.img } style={{ background: `${bg}33` }}>
                <img src={ img } alt="text" />
            </div>
            <div>
                <p>{ text }</p>
                <h4>R${ parseInt(main).toLocaleString('pt-BR') }</h4>
            </div>
        </div>
    )
}