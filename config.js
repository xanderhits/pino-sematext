'use strict'

const minimist = require('minimist')
const { token } = minimist(process.argv.slice(2))

if (!token) {
  throw new Error('Missing API Token. Use --token or `pino-sematext.token` in your package.json')
}

module.exports = {
  token
}
