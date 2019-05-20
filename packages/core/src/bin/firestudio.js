#!/usr/bin/env node

const commander = require('commander')
const pkg = require('./../../package.json')

commander
  .version(pkg.version)
  .description(pkg.description)
  .command('build-config', 'build firebase deployment config')
  .parse(process.argv)
