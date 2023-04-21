import { useState } from 'react'
import styles from './FormControl.module.css'

export default function ForControl({ aoAlterado ,label, inptId, type, placeholder, name, valor }) {

    const [ alertMessage, setAlertMessage ] = useState('')

    function inputChange(event) {
        if (type === "text") {
            if (!(/\s/g.test(event.target.value)) || event.target.value.length < 6) {
                setAlertMessage(`Digite nome e no mínimo um sobrenome`)
            } else {
                setAlertMessage("")
            }
        }
        if (type === "email") {
            if (event.target.value.indexOf('@') === -1 || event.target.value.indexOf('.com') === -1) {
                setAlertMessage(`Digite o email completo como no exemplo`)
            } else {
                setAlertMessage("")
            }
        }
        if (type === "password") {
            if (event.target.value.length < 8 || !/[A-Z]/.test(event.target.value)) {
                setAlertMessage("A senha deve conter 1 letra maiúscula e 8 caracteres")
            } else {
                setAlertMessage('')
            }
        }
        aoAlterado(event)
    }

    function inputOut(event) {
        setAlertMessage("")
    }

    return (
        <div className={ styles[`form-control`] }>
            <label htmlFor={inptId}>{label}</label>
            <input value={ valor } onBlur={ event => inputOut(event) } onChange={ event => inputChange(event) } id={inptId} name={name} type={type} placeholder={placeholder} />
            <div className={ styles.message }>
                <span className={ styles.alert } >{ alertMessage }</span>
            </div>
        </div>
    )
}