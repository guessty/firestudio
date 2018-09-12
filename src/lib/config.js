const path = require('path')
import { existsSync } from 'fs'
const withTypescript = require('@zeit/next-typescript')
//
const dir = path.resolve('.')

const defaultConfig = {
  appDir: './src/app',
  functionsDir: './src/functions',
  distDir: './dist',
  nextConfig: {
    webpack: (config) => config
  },
  firebaseConfig: {}
}

const configSource = path.join(dir, 'firestudio.config')

let appConfig = defaultConfig

if (existsSync(configSource)) {
  appConfig = require(configSource)
}

const config = {
  ...appConfig,
  nextConfig: {
    ...defaultConfig.nextConfig,
    ...appConfig.nextConfig
  },
  firebaseConfig: {
    ...defaultConfig.firebaseConfig,
    ...appConfig.firebaseConfig
  }
}


const appDir = path.join(path.resolve('.'), config.appDir)
const routes = require(path.join(appDir, 'config/routes'))

const withDefaults = (route) => ({
  prerender: true,
  ...route
})

const staticPathMap = routes.reduce((pathMap, route) => {
  const routeWithDefaults = withDefaults(route)
  if (routeWithDefaults.prerender) {
    pathMap[routeWithDefaults.pattern] = { page: routeWithDefaults.page }
  }
  return pathMap
}, {})

const nextConfig = {
  ...config.nextConfig,
  dir: config.appDir,
  distDir: `./../../${config.distDir}/functions/app`,
  assetPrefix: '',
  exportPathMap: () => staticPathMap,
}

module.exports = {
  ...config,
  nextConfig: withTypescript(nextConfig)
}
