import { useState } from 'react';
import formatMessage from '../utils/formatmessage'; 

const ChatForm = ({socket, user}) => {
    // State
    const [message, setMessage] = useState('')

    // Handle submit
    const handleSubmit = e => {
        // Prevent form from default behaviour, which is submitting to the server 
        e.preventDefault()

        // Only allow non-empty messsages to be sent 
        if (message !== "") {
            const { firstName, lastName } = user; 
            socket.emit("message", { message: formatMessage(firstName, lastName, message), id: socket.id })
            setMessage('')
        }

    }

    return (
        <form id="chat-form" onSubmit={handleSubmit}>
            <input placeholder="Aa" id="chat-form-message" value={message} onChange={e => setMessage(e.target.value)} />
            <button className="btn-primary" type="submit" id="chat-form-submit"><i className="fa fa-paper-plane" aria-hidden="true" /></button>
        </form>
    )
}

export default ChatForm;