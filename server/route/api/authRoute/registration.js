const express = require('express')
const registrationController = require('../../../controllers/registrationController')
const secureAPI = require('../../../middlewears/secureAPI')
const otpController = require('../../../controllers/otpController')
const _ = express.Router()


_.post('/registration', secureAPI, registrationController)
_.post('/otp', otpController)

module.exports = _