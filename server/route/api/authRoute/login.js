const express = require('express')
const _ = express.Router()

_.get('/login',(req, res)=>{
    res.send("Login")
})

module.exports = _