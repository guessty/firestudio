#!/usr/bin/env node
const path = require('path')
//
const devServer = require('./../lib/dev-server')

module.exports = devServer(path.resolve('.'))
