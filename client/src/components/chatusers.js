import ChatSearch from './chatsearch';
const ChatUsers = ({ users }) => {
    return (
        <ul id="chat-users">
                <li className="chat-user">Egor Ushakov</li>
                <li className="chat-user">Ilya Ushakov</li>
                <li className="chat-user">Zoe Yu</li>
                <li className="chat-user">Lebron James</li>
                {users.map((user, i) => {
                    return <li className="chat-user" key={i}>{user.firstName} {user.lastName}</li>
                })}
            </ul>
    )
}

export default ChatUsers; 
