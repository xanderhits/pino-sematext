#!/usr/bin/env node

const Pino = require('pino')
const { err } = require('pino-std-serializers')
const pump = require('pump')
const split = require('split2')
const through = require('through2')
const Logsene = require('logsene-js')
const { token } = require('./config.js')

const lsLogger = new Logsene(token)
const levels = Pino.levels.labels

function safeParse (src) {
  try {
    return JSON.parse(src)
  } catch (error) {
    lsLogger.log('error', 'unparseable log message', { error: err(error) })
  }
}

function handleLog (log, cb) {
  const { level, time, pid, hostname, msg = '', ...params } = log
  lsLogger.log(levels[level] || 'info', msg, { ...params, pid, hostname })
  cb()
}

const transport = through.obj(
  (log, _enc, callback) => {
    handleLog(log, callback)
  }
)

pump(process.stdin, split(safeParse), transport)
