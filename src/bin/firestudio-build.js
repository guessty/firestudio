#!/usr/bin/env node
import path from 'path'
//
import validate from './../lib/build/validate'
import buildConfig from './../lib/build/config'
import buildApp from './../lib/build/app'
import buildFunctions from './../lib/build/functions'
import buildDeploymentConfig from './../lib/build/deployment-config'
//

const currentPath = path.resolve('.')

async function build (currentPath) {
  const config = await buildConfig()
  console.log('|---- Checking Build Configuration...')
  await validate(currentPath, config)
  console.log('|---> Done!')
  console.log('|')
  console.log('|---- Building App...')
  await buildApp(currentPath, config)
  console.log('|---> Done!')
  console.log('|')
  console.log('|---- Configuring Cloud Funtions...')
  await buildFunctions(currentPath, config)
  console.log('|---> Done!')
  console.log('|')
  console.log('|---- Generating Deployment Config...')
  await buildDeploymentConfig(currentPath, config)
  console.log('|---> Done!')
  console.log('|')
  console.log('|---> Finished!')
}

build(currentPath)
