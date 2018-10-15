const path = require('path')
const requireFoolWebpack = require('require-fool-webpack')
const withTypescript = require('@zeit/next-typescript')
const webpack= require('webpack')
//
const { parsed: localEnv } = require('dotenv')
const dir = path.resolve('.')

const appDir = './src/app'
const functionsDir = './src/functions'
const distDir = './dist'
const publicDistDir = './dist/public'
const functionsDistDir = './dist/functions'
const nextDistDir = `./../../${distDir}/functions/app`

const defaultConfig = {
  app: {
    dir: appDir,
    next: {
      webpack: () => {}
    },
  },
  firebase: {
    projectId: '<projectId>',
  },
  functions: {
    dir: functionsDir,
  },
  plugins: [],
  rewrites: [],
}

const configSource = path.join(dir, 'firestudio.config')

let customConfig = defaultConfig

try {
  customConfig = requireFoolWebpack(configSource)
} catch {
  console.log('Using default app config')
}

const appConfig = customConfig.app || defaultConfig.app
const appNextConfig = appConfig.next|| defaultConfig.app.next
const firebaseConfig = customConfig.firebase || defaultConfig.firebase
const functionsConfig = customConfig.functions || defaultConfig.functions
const rewritesConfig = customConfig.rewrites || defaultConfig.rewrites
const pluginsConfig = customConfig.plugins || defaultConfig.plugins


const appPath = path.join(dir, appDir)
const router = requireFoolWebpack(path.join(appPath, 'router'))

const nextConfig = {
  ...appNextConfig,
  dir: appDir,
  distDir: nextDistDir,
  assetPrefix: '',
  exportPathMap: () => router.staticRoutes,
}

const config = {
  app: {
    ...appConfig,
    dir: appDir,
    next: withTypescript(nextConfig)
  },
  firebase: firebaseConfig,
  functions: {
    ...functionsConfig,
    dir: functionsDir
  },
  rewrites: rewritesConfig,
  plugins: pluginsConfig,
  dist: {
    dir: distDir,
    public: {
      dir: publicDistDir
    },
    functions: {
      dir: functionsDistDir
    }
  }
}

console.log(config)

module.exports = config
