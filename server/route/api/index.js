const express = require('express')
const _ = express.Router()
const Registration = require('./authRoute/registration')
const Login = require('./authRoute/login')

_.use('/authentication', Registration)
_.use('/authentication', Login)

module.exports = _