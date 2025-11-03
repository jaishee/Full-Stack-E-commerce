const express = require('express')
const registrationController = require('../../../controllers/registrationController')
const secureAPI = require('../../../middlewears/secureAPI')
const _ = express.Router()


_.post('/registration', secureAPI, registrationController)


module.exports = _