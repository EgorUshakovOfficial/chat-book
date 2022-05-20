import ChatUsers from '../components/chatusers';
import ChatForm from '../components/chatform';
import ChatDisplay from '../components/chatdisplay';
import ChatHeader from '../components/chatheader';
import ChatSearch from '../components/chatsearch';
import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';
import '../styles/chat.css';

const Chat = ({user, authToken, timer, logoutUser}) => {
    // State
    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [activeUsers, setActiveUsers] = useState([])

    useEffect(() => {
        let socket = socketIo.connect('http://localhost:4000', {
            auth: {
                token: authToken
            }
        })

        setSocket(socket)

        // Messages 
        socket.on('message', data => {
            setMessages(messages => [...messages, data])
        })

        // Update list of active users 
        socket.on('update users', users => {
            setActiveUsers(users)
        })

        // Clean up 
        return () => socket.disconnect()
    }, [])

    return (
        <div id="chat">
            <ChatSearch />
            <ChatHeader timer={timer} logoutUser={logoutUser} />
            <ChatUsers users={activeUsers} />
            <ChatDisplay socket={socket} messages={messages} />
            <ChatForm socket={socket} user={user} />
        </div>
    )
}

export default Chat; 
