'use strict'

const minimist = require('minimist')
let { token } = minimist(process.argv.slice(2))

if (!token) {
  const config = require('./package.json')
  token = config['pino-sematext'].token
}

if (!token) {
  throw new Error('Missing API Token. Use --token or `pino-sematext.token` in your package.json')
}

module.exports = {
  token
}
