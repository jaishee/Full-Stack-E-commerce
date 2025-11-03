const express = require('express')
const _ = express.Router()
const Auth = require('./api')
const API = process.env.API_BASE_URL

_.use(API, Auth)

module.exports = _