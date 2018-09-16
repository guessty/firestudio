const path = require('path')
const requireFoolWebpack = require('require-fool-webpack')
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

try {
  appConfig = requireFoolWebpack(configSource)
} catch {
  console.log('Using default app config')
}

const appNextConfig = appConfig.nextConfig || {}
const appFirebaseConfig = appConfig.firebaseConfig || {}

const config = {
  ...defaultConfig,
  ...appConfig,
  nextConfig: {
    ...defaultConfig.nextConfig,
    ...appNextConfig
  },
  firebaseConfig: {
    ...defaultConfig.firebaseConfig,
    ...appFirebaseConfig
  }
}


const appDir = path.join(dir, config.appDir)
// const routes = require.resolve(`${path.join(appDir, 'config/routes')}`)
const routes = requireFoolWebpack(path.join(appDir, 'config/routes'))

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
