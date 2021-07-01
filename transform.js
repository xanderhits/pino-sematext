'use strict'

const Pino = require('pino')
const levels = Pino.levels.labels
const logger = require('./logger.js')

function safeParse (src) {
  try {
    return JSON.parse(src)
  } catch (error) {
    logger.log('error', 'unparseable log message', { exception: error.message, original: JSON.stringify(src) })
  }
}

function handleLog (log, cb) {
  const { level, time, pid, hostname, msg = '', ...params } = log
  logger.log(levels[level] || 'info', msg, { ...params, pid, hostname })
  cb()
}

module.exports = {
  safeParse,
  handleLog
}
