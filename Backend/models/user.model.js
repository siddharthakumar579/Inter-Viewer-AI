const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "username already taken"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "account already linked with this email"]
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("users", userSchema)