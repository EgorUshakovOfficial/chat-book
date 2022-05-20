const ChatHeader = ({timer, logoutUser }) => {
    // Handle logout
    const handleLogout = () => {
        clearInterval(timer)
        logoutUser()
    }

    return (
     <div id="chat-header">
        <div id="chat-name">Community</div>
        <button onClick={handleLogout} className="btn btn-danger" id="chat-logout">Leave Chat</button>
    </div>)
}

export default ChatHeader; 
