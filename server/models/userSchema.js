const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    otp:{
        type: String
    }
})

module.exports = mongoose.model("Userlist", userSchema)