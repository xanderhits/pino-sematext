'use strict'

const Logsene = require('logsene-js')
const { token } = require('./config.js')
const logger = new Logsene(token, null, 'https://logsene-receiver.eu.sematext.com/_bulk')

module.exports = logger
