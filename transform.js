'use strict'

const Pino = require('pino')
const levels = Pino.levels.labels
const logger = require('./logger.js')

function safeParse (src) {
  console.log(src)

  try {
    return JSON.parse(src)
  } catch (error) {
    // Do nothing at this point.
    // console.log('[skipped] ', src) 
    // { exception: error.message, original: JSON.stringify(src) }
  }
}

function handleLog (log, cb) {
  const { level, time, pid, hostname, msg = '', ...params } = log
  logger.log(levels[level] || 'info', msg, { ...params, pid, hostname, '@timestamp': time })
  cb()
}

module.exports = {
  safeParse,
  handleLog
}
