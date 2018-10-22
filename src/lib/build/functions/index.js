import path from 'path'
import cpx from 'cpx'
//
import webpackBuild from './webpack-build'

const copyFiles = (currentPath, appPath, functionsDistPath) => new Promise((resolve) => {
  const routerPath = path.join(appPath, 'router.js')
  const functionsTemplateSource = path.join(currentPath, 'node_modules/firestudio/lib/build/functions/template/*.*')

  console.log('Copying Files...')
  cpx.copy(`${currentPath}/package.json`, functionsDistPath, {}, () => {
    cpx.copy(`${currentPath}/package-lock.json`, functionsDistPath, {}, () => {
      cpx.copy(functionsTemplateSource, functionsDistPath, {}, () => {
        cpx.copy(routerPath, `${functionsDistPath}`, {}, () => {
          console.log('Files copied')
          resolve();
        })
      })
    })
  })
})

export default async function buildFunctions (currentPath, config, dev = false) {
  const appPath = path.join(currentPath, config.app.dir)
  const functionsDistPath = dev
    ? path.join(currentPath, 'tmp/functions')
    : path.join(currentPath, config.dist.functions.dir)
  console.log('Building Functions...')
  await copyFiles(currentPath, appPath, functionsDistPath)
  await webpackBuild(config.functions.dir, functionsDistPath)
  console.log('Functions Built.')
}