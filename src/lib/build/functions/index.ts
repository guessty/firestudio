import * as path from 'path'
import * as fs from 'fs'
const cpx = require('cpx')
//
import { default as webpackBuild } from './webpack-build'

const copyFiles = (currentPath: string, functionsDistPath: string) => new Promise((resolve) => {
  const functionsTemplateSource = path.join(currentPath, 'node_modules/firestudio/lib/build/functions/template/*.*')

  cpx.copy(`${currentPath}/package.json`, functionsDistPath, {}, () => {
    cpx.copy(`${currentPath}/package-lock.json`, functionsDistPath, {}, () => {
      cpx.copy(functionsTemplateSource, functionsDistPath, {}, () => {
        resolve();
      })
    })
  })
})

const writeRoutesFile = async (functionsDistPath: string, config: any) => {
  const { routes, cloudRenderedRoutes, cloudRenderAllDynamicRoutes } = config
  const routesConfig = {
    routes,
    cloudRenderAllDynamicRoutes,
    cloudRenderedRoutes
  }

  await fs.writeFile(`${functionsDistPath}/routes.config.js`, `module.exports = ${JSON.stringify(routesConfig, null, 2)}`, function (err) {
    if (err) throw err;
  });
}

const writeNextConfigFile = async (functionsDistPath: string, nextConfig: any) => {
  await fs.writeFile(`${functionsDistPath}/next.config.js`, `module.exports = ${JSON.stringify(nextConfig, null, 2)}`, function (err) {
    if (err) throw err;
  });
}

export default async function buildFunctions (currentPath: string, config: any, dev = false) {
  const functionsDistPath = dev
    ? path.join(currentPath, 'tmp/functions')
    : path.join(currentPath, config.dist.functions.dir)
  console.log(functionsDistPath)
  await copyFiles(currentPath, functionsDistPath)
  console.log('|- loaded template files!')
  await writeNextConfigFile(functionsDistPath, config.next)
  console.log('|- generated next configuration file!');
  await writeRoutesFile(functionsDistPath, config)
  console.log('|- configured routes!');
  await webpackBuild(config.functions.dir, functionsDistPath)
  console.log('|- complied functions!')
}