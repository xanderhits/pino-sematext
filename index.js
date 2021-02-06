#!/usr/bin/env node

const pino = require('pino')
const pump = require('pump')
const split = require('split2')
const through = require('through2')
const Logsene = require('logsene-js')

const token = 'foo' // get token arg

const lsLogger = new Logsene(token)
const levels = pino.levels.labels

function safeParse (src) {
  try {
    return JSON.parse(src)
  } catch (e) {
    lsLogger.log('error', 'unparseable log message', e.message)
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