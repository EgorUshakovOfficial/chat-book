import { useEffect, useRef } from 'react';
const ChatDisplay = ({ socket, messages, }) => {
    const chatDisplayElem = useRef(null)
    useEffect(() => {
        const chatElem = chatDisplayElem.current
        const { offsetHeight, scrollHeight } = chatElem
        if (scrollHeight > offsetHeight) {
            chatElem.scrollTop = offsetHeight
        }
    })

    return (<ul id="chat-display" ref={chatDisplayElem}>
        {messages.map((obj, i) => {
            const { message, id } = obj

            if (id === socket.id) {
                return <li key={i} className="blue-message" dangerouslySetInnerHTML={{__html: message}} />
            }
            return <li key={i} className="gray-message" dangerouslySetInnerHTML={{ __html: message }}/>
        })}
    </ul>)
}

export default ChatDisplay; 