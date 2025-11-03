const express = require('express')
const loginController = require('../../../controllers/loginController')
const _ = express.Router()

_.get('/login',loginController)

module.exports = _