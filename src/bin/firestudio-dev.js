#!/usr/bin/env node
const path = require('path')
//
import validate from './../lib/build/validate'
import buildConfig from './../lib/build/config'
import devServer from './../lib/dev-server'

const currentPath = path.resolve('.')

async function dev (currentPath) {
  const config = await buildConfig()
  await validate(currentPath, config)
  devServer(currentPath, config)
}

dev(currentPath)
