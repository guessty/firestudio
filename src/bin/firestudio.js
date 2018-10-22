#!/usr/bin/env node

const chalk = require('chalk')
const commander = require('commander')
const pkg = require('./../package.json')

commander
  .version(pkg.version)
  .description(pkg.description)
  .command('dev', 'start the development server')
  .command('build', 'build the project')
  .option('-de --deploy-env <deploy-env>', 'Deployment Environment', /^(firebase|webServer)$/i, 'firebase')
  .parse(process.argv)
