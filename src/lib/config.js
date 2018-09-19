const path = require('path')
const requireFoolWebpack = require('require-fool-webpack')
const withTypescript = require('@zeit/next-typescript')
//
const dir = path.resolve('.')

const defaultConfig = {
  appDir: './src/app',
  functionsDir: './src/functions',
  distDir: './dist',
  next: {
    webpack: (config) => config
  },
  firebase: {
    projectId: '<projectId>'
  }
}

const configSource = path.join(dir, 'firestudio.config')

let appConfig = defaultConfig

try {
  appConfig = requireFoolWebpack(configSource)
} catch {
  console.log('Using default app config')
}

const appNextConfig = appConfig.next|| {}
const appFirebaseConfig = appConfig.firebase || {}

const config = {
  ...defaultConfig,
  ...appConfig,
  next: {
    ...defaultConfig.next,
    ...appNextConfig
  },
  firebase: {
    ...defaultConfig.firebase,
    ...appFirebaseConfig
  }
}


const appDir = path.join(dir, config.appDir)
const router = requireFoolWebpack(path.join(appDir, 'router'))

const nextConfig = {
  ...config.next,
  dir: config.appDir,
  distDir: `./../../${config.distDir}/functions/app`,
  assetPrefix: '',
  exportPathMap: () => router.staticRoutes,
}

module.exports = {
  ...config,
  next: withTypescript(nextConfig)
}
