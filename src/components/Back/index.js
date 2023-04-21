import { useNavigate } from "react-router-dom"
import styles from './Back.module.css'

export default function Back({ path }) {

    const navegar = useNavigate()

    return (
        <div className={ styles.back } onClick={ () => navegar(`${path}`) }>
            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M10.6,12.71a1,1,0,0,1,0-1.42l4.59-4.58a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L9.19,9.88a3,3,0,0,0,0,4.24l4.59,4.59a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42Z"/></svg>
            voltar
        </div>
    )
}