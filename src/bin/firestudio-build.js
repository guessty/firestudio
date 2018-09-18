#!/usr/bin/env node
import build from 'next/dist/build'
import exportApp from 'next/dist/server/export'
import { printAndExit } from 'next/dist/lib/utils'
import path from 'path'
import cpx from 'cpx'
import { existsSync } from 'fs'
//
import config from './../lib/config'
import buildFunctions from './../lib/build-functions'
import generateFirebaseFiles from './../lib/generate-firebase-files'

const dir = path.resolve('.')
const appDir = path.join(dir, config.appDir)
const functionsDir = path.join(dir, config.functionsDir)
const distDir = path.join(dir, config.distDir)

const nextConfig = config.next

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
    console.log('App Build Successful')
    exportApp(appDir, { outdir: `${distDir}/public` }, nextConfig)
      .then(() => {
        console.log('Export of Static Pages Successful')
        const routesSource = `${appDir}/config/routes.js`
        const functionsTemplateSource = path.join(dir, 'node_modules/firestudio/dist/templates/functions/*.*')
        const functionsDistDir = `${distDir}/functions`
        if (!existsSync(routesSource)) {
          printAndExit(`> Cannot find routes config: ${routesSource}`)
        }
        cpx.copy(`${dir}/package.json`, functionsDistDir, {}, () => {
          cpx.copy(`${dir}/package-lock.json`, functionsDistDir, {}, () => {
            cpx.copy(functionsTemplateSource, functionsDistDir, {}, () => {
              cpx.copy(routesSource, `${functionsDistDir}/config`, {}, () => {
                buildFunctions(functionsDir, functionsDistDir)
                  .then(() => {
                    console.log('Functions Build Successful')
                    generateFirebaseFiles(config.firebase, distDir)
                      .then(() => {
                        console.log('Generated Deployment Config')
                        printAndExit('Finished', 0)
                      })
                      .catch((err) => {
                        printAndExit(err)
                      })
                  })
                  .catch((err) => {
                    printAndExit(err)
                  })
              })
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