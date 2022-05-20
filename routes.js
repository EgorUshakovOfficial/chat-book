const { getToken, getRefreshToken, verifyUser, COOKIE_OPTIONS} = require('./authenticate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const crypto = require('crypto');
const sendEmail = require('./utils/sendemail'); 
const emailExist = require('./middleware/register-middleware');
const ensureAuthenticated = require('./middleware/login-middleware')

module.exports = (app, User) => {
    // Send forgot-password email
    app.post('/forgot-password', (req, res) => {
        const { email } = req.body

        // Search for user in database 
        User.findOne({ email }, (err, user) => {
            if (err) {
                res.statusCode = 500
                res.send(err)
            }
            if (user !== null){
                let token = crypto.randomBytes(10).toString('hex')

                // Set expiry date to be 15 minutes
                let expiryDate = new Date()
                expiryDate.setMinutes(expiryDate.getMinutes() + 15)

                // Update recover token in database and then save 
                user.recoverToken = {token, expiryDate}
                user.save()
                    .then(user => {
                        sendEmail(email, token)
                    })
                    .catch(err => {
                        res.statusCode = 500
                        res.send(err)
                    })
            }

            // Send success message regardless whether email has been sent out or not
            res.json({ success: true, message: "If the email was found in our database, you should receive a notification to reset your password soon." })

        })

    })

    app.get('/forgot-password/:recoverToken', (req, res) => {
        const { recoverToken } = req.params
        User.findOne({ "recoverToken.token": recoverToken }, (err, user) => {
            if (err) {
                res.statusCode = 500
                res.send(err)
            }
            if (user) {
                let currentDate = new Date()
                const { token, expiryDate } = user.recoverToken
                if (currentDate <= expiryDate) {
                    (recoverToken === token)
                        ? res.json({ isMatch: true })
                        : res.json({ isMatch: false })
                }
            } else {
                res.json({isMatch: false})
            }
        })
    })

    app.post('/forgot-password/reset', (req, res) => {
        const { email, code, password } = req.body
        console.log(email)
        console.log(code)
        User.findOne({ email, "recoverToken.token": code }, (err, user) => {
            if (err) {
                res.statusCode = 500
                res.send(err)
            }
            if (user) {
                // Hash password 
                const saltRounds = 10
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) {
                        res.statusCode = 500
                        res.send(err)
                    } else {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) {
                                res.statusCode = 500
                                res.send(err)
                            } else {
                                user.password = hash
                                user.recoverToken = {}
                                user.save()
                                    .then(user => {
                                        res.json({ success: true, message: "Password has been updated successfully! You may now log in" })
                                    })
                                    .catch(err => {
                                        res.statusCode = 500
                                        res.send(err)
                                    })
                            }
                        })
                    }
                })
            }
            else {
                res.json({success:false, message:"Error! Something has gone wrong"})
            }
        })
    })

    //Register route 
    app.post('/register', emailExist, (req, res) => {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body
        const username = req.body.username || ""

        // Generate salt for hash 
        const saltRounds = 10
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                res.statusCode = 500
                res.send(err)
            }

            // Hash password
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    res.statusCode = 500
                    res.send(err)
                } else {
                    // Create user in database
                    let user = new User({
                        firstName,
                        lastName,
                        email,
                        username,
                        password: hash
                    })

                    // Save user in database
                    user.save()
                        .then(user => {
                            res.json({success: "User is successfully registered and may now log in"})
                        })
                        .catch(err => {
                            res.statusCode = 500
                            res.send(err)
                        })
                }
            })
        })
    })

    // Login route 
    app.post('/login',
        passport.authenticate('local'),
        ensureAuthenticated,
        (req, res) => {
            const { _id } = req.user 
            const token = getToken({ _id })
            const refreshToken = getRefreshToken({ _id })

            // Add refresh token to database 
            User.findOne({ _id })
                .then(user => {
                    user.refreshToken.push(refreshToken)
                    user.save((err, user) => {
                        if (err) {
                            res.statusCode = 500
                            res.send(err)
                        } else {
                            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                            COOKIE_OPTIONS.httpOnly = false 
                            res.cookie("connect-sid", "", COOKIE_OPTIONS)
                            res.json({token})
                        }
                    })
                })
                .catch(err => {
                    res.statusCode = 500
                    res.send(err)
                })
        }
    )

    // Logout
    app.get('/logout', (req, res) => {
        const { signedCookies = {} } = req
        const { refreshToken } = signedCookies

        if (refreshToken) {
            try {
                const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
                const { _id } = payload
                User.findOne({ _id })
                    .then(user => {
                        const tokenIndex = user.refreshToken.findIndex(item => item === refreshToken)
                        if (tokenIndex !== -1) {
                            user.refreshToken.splice(tokenIndex, 1)
                        }

                        // Save changes
                        user.save((err, user) => {
                            if (err) {
                                res.statusCode = 500
                                res.send(err)
                            } else {
                                res.clearCookie("refreshToken")
                                res.clearCookie("connect-sid")
                                res.end()
                            }
                        })
                    })
            } catch (err) {
                res.statusCode = 500
                res.send(err)
            }
        } else {
            res.clearCookie("connect-sid")
            res.json({message: "Your session has expired. Please log in to pick up where you left off"})
        }
    })

    // Refresh token route 
    app.post('/refreshToken', (req, res) => {
        const { signedCookies = {} } = req
        const { refreshToken } = signedCookies

        if (refreshToken) {
            try {
                const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
                const { _id } = payload
                User.findOne({ _id })
                    .then(user => {
                        if (user) {
                            const tokenIndex = user.refreshToken.findIndex(item => item === refreshToken)
                            if (tokenIndex === -1) {
                                res.statusCode = 401
                                res.send("Unauthorized")
                            } else {
                                // Update current refresh token with new one 
                                const token = getToken({ _id })
                                const newRefreshToken = getRefreshToken({ _id })
                                user.refreshToken[tokenIndex] = newRefreshToken

                                // Save updated changes 
                                user.save((err, user) => {
                                    if (err) {
                                        res.statusCode = 500
                                        res.send(err)
                                    } else {
                                        res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                                        COOKIE_OPTIONS.httpOnly = false
                                        res.cookie("connect-sid", "", COOKIE_OPTIONS)
                                        res.json({ token })
                                    }
                                })
                            }
                        }
                    })
            } catch (err) {
                res.statusCode = 500
                res.send(err)
            }
        } else {
            res.statusCode = 401
            res.send("Unauthorized")
        }

    })

    // User route 
    app.get('/user',
        verifyUser,
        ensureAuthenticated,
        (req, res) => {
            delete req.user.refreshToken
            res.json({user:req.user})
        })

}
