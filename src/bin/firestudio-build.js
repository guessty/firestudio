#!/usr/bin/env node
import path from 'path'
//
import validate from './../lib/validate'
import config from './../lib/build/config'
import buildApp from './../lib/build/app'
import buildFunctions from './../lib/build/functions'
import buildDeploymentConfig from './../lib/build/deployment-config'
//

const currentPath = path.resolve('.')

async function build (currentPath, config) {
  await validate(currentPath, config)
  await buildApp(currentPath, config)
  if (config.functions.enabled) {
    await buildFunctions(currentPath, config)
  }
  await buildDeploymentConfig(currentPath, config)
}

build(currentPath, config)
