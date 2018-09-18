#!/usr/bin/env node

const chalk = require('chalk')
const commander = require('commander')
const pkg = require('./../../package.json')

commander
  .version(pkg.version)
  .description(pkg.description)
  .command('start', 'start the development server')
  .command('build', 'build the project')
  .parse(process.argv)
