'use strict'

const Logsene = require('logsene-js')
const { token } = require('./config.js')
const logger = new Logsene(token)

module.exports = logger
