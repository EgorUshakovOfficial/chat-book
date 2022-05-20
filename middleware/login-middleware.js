const ensureAuthenticated = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.statusCode = 401
        res.send("Unauthorized")
    }
}

module.exports = ensureAuthenticated;