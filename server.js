// Configure dotenv
require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const User = require('./models/user');
const passport = require('passport');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

// Connect to database
require('./utils/connectdb');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: "https://chat-book.onrender.com",
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());

// Passport strategies
require('./strategies/LocalStrategy');
require('./strategies/JwtStrategy');

// Routes
routes(app, User);

// Socket Io events
require('./utils/socketconn')(io, User);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static('client/build'));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

// Listen to server
const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server listening on port ${port}...`))
