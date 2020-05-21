#!/usr/bin/env node
const path = require('path')
const parseArgs = require('minimist')
//
const buildDeploymentConfig = require('./../lib/deployment');
const loadConfig = require('./../lib/utils/get-next-config');
//

function build () {
  const argv = parseArgs(process.argv.slice(2), {
    alias: {
      o: 'outdir',
    },
    default: { o: null }
  });

  const dir = path.resolve(argv._[0] || '.');
  const config = loadConfig(dir);
  const outdir = argv.outdir ? path.resolve(argv.outdir) : path.resolve(config.distDir, '..', '/.firepress');

  console.log('|---- Generating Firebase Deployment Config...');
  buildDeploymentConfig(outdir, config);
  console.log('|---> Done!');
}

build();
