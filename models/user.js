const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recoverTokenSchema = new Schema({
    token: { type: String, default: "" },
    expiryDate: {type:Date}
})

// User schema
const userSchema = new Schema({
    firstName: { type: String, isRequired: true },
    lastName: {type: String, isRequired: true},
    email: { type: String, isRequired: true },
    username: { type: String, default: ""},
    password: { type: String, isRequired: true },
    refreshToken: { type: [String] },
    online: { type: Boolean, default: false },
    recoverToken: { type: recoverTokenSchema}
})

module.exports = mongoose.model("User", userSchema);
