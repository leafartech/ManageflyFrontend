import './Message.css'

export default function Message({ text, error }) {
    if (text) {
        return (
            <div className={ error ? 'error-message' : 'success-message' }>{ text }</div>
        )
    } else {
        return ('')
    }
}