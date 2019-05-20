#! /usr/bin/env node

const parseArgs = require('minimist')
const lib = require('./..')

const createFirestudioApp = lib.createFirestudioApp

function create() {
  const argv = parseArgs(process.argv.slice(2), {
    alias: {
      t: 'template',
    },
    default: { t: 'default' }
  });

  const projectName = argv._[0]

  createFirestudioApp({
    projectName,
    templateName: argv.template
  })
}

create()
