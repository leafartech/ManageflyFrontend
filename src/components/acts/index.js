import { NavLink } from 'react-router-dom'
import './acts.css'

export default function Acts({ icon, text, path }) {
    return (
        <NavLink className="act-link" to={ path }>
            <img src={ icon } alt={ text } />
            { text }
        </NavLink>
    )
}