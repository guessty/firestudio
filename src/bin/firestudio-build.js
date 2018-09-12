#!/usr/bin/env node
import build from 'next/dist/build'
import exportApp from 'next/dist/server/export'
import { printAndExit } from 'next/dist/lib/utils'
import path from 'path'
import cpx from 'cpx'
import { existsSync } from 'fs'
//
import config from './../lib/config'

const dir = path.resolve('.')
const appDir = path.join(dir, config.appDir)
const functionsDir = path.join(dir, config.appDir)
const distDir = path.join(dir, config.distDir)

const nextConfig = config.nextConfig

// Check if pages dir exists and warn if not
if (!existsSync(appDir)) {
  printAndExit(`> No such directory exists as the project root: ${appDir}`)
}

if (!existsSync(path.join(appDir, 'pages'))) {
  if (existsSync(path.join(appDir, '..', 'pages'))) {
    printAndExit('> No `pages` directory found. Did you mean to run `firestore build` in the parent (`../`) directory?')
  }

  printAndExit('> Couldn\'t find a `pages` directory. Please create one under the project root')
}

build(appDir, nextConfig)
  .then(() => {
    console.log('Build Successful')
    exportApp(appDir, { outdir: `${distDir}/public` }, nextConfig)
      .then(() => {
        console.log('Export of Static Pages Successful')
        const routesSource = `${appDir}/config/routes.js`
        const functionsTemplateSource = path.join(dir, 'node_modules/firestudio/dist/templates/functions/*.*')
        const customFunctionsSource = `${functionsDir}/*.*`
        const functionsDistDir = `${distDir}/functions`
        if (!existsSync(routesSource)) {
          printAndExit(`> Cannot find routes config: ${routesSource}`)
        }
        console.log(functionsTemplateSource)
        cpx.copy(functionsTemplateSource, functionsDistDir, {}, () => {
          cpx.copy(routesSource, `${functionsDistDir}/config`, {}, () => {
            cpx.copy(customFunctionsSource, `${functionsDistDir}/functions`, {}, () => {
              printAndExit('Finished', 0)
            })
          })
        })
      })
      .catch((err) => {
        printAndExit(err)
      })
  })
  .catch((err) => {
    printAndExit(err)
  })