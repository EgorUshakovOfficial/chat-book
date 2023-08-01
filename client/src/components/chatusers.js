import ChatSearch from './chatsearch';
const ChatUsers = ({ users }) => {
    return (
        <ul id="chat-users">
                {users.map((user, i) => {
                    return <li className="chat-user" key={i}>{user.firstName} {user.lastName}</li>
                })}
            </ul>
    )
}

export default ChatUsers;
