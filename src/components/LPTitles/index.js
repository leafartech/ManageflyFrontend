import styles from './LPTitles.module.css'

export default function LPTitles({ title, topTitle, paragraph, align}) {
    return (
        <div className={ `${styles.title} ${ styles[align] }` }>
            <h5>{topTitle}</h5>
            <h2>{title}</h2>
            <p>{paragraph}</p>
        </div>
    )
}