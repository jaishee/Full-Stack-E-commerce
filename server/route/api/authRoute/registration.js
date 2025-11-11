const express = require('express')
const registrationController = require('../../../controllers/registrationController')
const secureAPI = require('../../../middlewears/secureAPI')
const otpController = require('../../../controllers/otpController')
const forgetPasswordController = require('../../../controllers/forgetPasswordController')
const resetPasswordController = require('../../../controllers/resetPasswordController')
const _ = express.Router()


_.post('/registration', secureAPI, registrationController)
_.post('/otp', otpController)
_.get("/verify-email/:token", otpController);
_.post('/forgetpassword', forgetPasswordController)
_.post('/resetpassword', resetPasswordController)

module.exports = _