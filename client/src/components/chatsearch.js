const ChatSearch = () => {
    // Handle input 
    const handleInput = e => {
        // Search query 
        let filter = e.target.value.toUpperCase()

        // ul element 
        const activeUsers = document.getElementById("chat-users")

        // li elements
        const usernames = activeUsers.getElementsByTagName("li")

        // Loop through all list items, and hide those who don't match the search query 
        for (let i = 0; i < usernames.length; i++) {
            let username = usernames[i]
            let usernameText = username.innerHTML.toUpperCase()

            if (usernameText.indexOf(filter.toUpperCase()) > -1) {
                username.style.display = ""
            } else {
                username.style.display = "none"
            }
        }

    }

    return (
        <div id="chat-search">
            <h2 className="title" id="chat-search-title">Chat</h2>
            <input id="chat-search-users" onChange={handleInput} placeholder="Search chat" />
        </div>
    )
}

export default ChatSearch;
