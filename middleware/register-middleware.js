const User = require('../models/user');

const emailExist = (req, res, next) => {
    const email = req.body.email

    // Check if email is already registered with an account
    User.findOne({ email })
        .then(user => {
            if (user) {
                res.json({ error: "Email is already registered with another account" })
            } else {
                next()
            }
        })
        .catch(err => res.send(err))
}


module.exports = emailExist; 