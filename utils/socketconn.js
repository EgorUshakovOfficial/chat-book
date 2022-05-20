const jwt = require('jsonwebtoken');
const formatMessage = require('./formatmessage'); 

module.exports = (io, User) => {
    // Updates online status of new user connection and retrieves new list of active users  
    const updateOnlineStatus = (userId, isOnline) => {
        User.findOne({ _id: userId })
            .then(user => {
                user.online = isOnline
                user.save((err, user) => {
                    if (err) {
                        console.log(err)
                    } else {
                        User.find({ online: true })
                            .then(users => {
                                users = users.map(user => {
                                    return {
                                        firstName: user.firstName,
                                        lastName: user.lastName
                                    }
                                })
                                io.emit("update users", users)
                            })
                    }
                })
        })

    }

    // Middleware 
    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.token
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            User.findOne({ _id: payload._id })
                .then(user => {
                    socket.user = user
                    next()
                })
        } catch (err) {
            next(err)
        }
    })

    // Connection 
    io.on('connection', socket => {
        const { _id, firstName, lastName } = socket.user

        // Active users
        updateOnlineStatus(_id, true)

        // Automated connect message
        socket.broadcast.emit('message', { message: formatMessage(`${firstName} ${lastName} has joined the chat`), id: "automated"})

        // Messages 
        socket.on('message', data => {
            io.emit('message', data)
        })

        // Disconnect
        socket.on('disconnect', () => {
            updateOnlineStatus(_id, false)

            // Automated disconnect message
            io.emit('message', { message: formatMessage(`${firstName} ${lastName} has left the chat`), id: "automated" })
        })

    })
}
