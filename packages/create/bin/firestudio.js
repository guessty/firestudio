#!/usr/bin/env node

const commander = require('commander')
const chalk = require('chalk')
const lib = require('./..')
const pkg = require('./../package.json')

const messages = lib.messages

commander
  .version(pkg.version)
  .description(pkg.description)
  .command('create', 'create a new firestudio app')
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .allowUnknownOption()
  .on('--help', messages.help)
  .parse(process.argv)
