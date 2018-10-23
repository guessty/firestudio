const path = require('path')
const requireFoolWebpack = require('require-fool-webpack')
const withTypescript = require('@zeit/next-typescript')
//
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
  },
  firebase: {
    projectId: '<projectId>',
  },
  functions: {
    dir: functionsDir,
  },
  // plugins: [],
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
const firebaseConfig = customConfig.firebase || defaultConfig.firebase
const functionsConfig = customConfig.functions || defaultConfig.functions
const rewritesConfig = customConfig.rewrites || defaultConfig.rewrites
// const pluginsConfig = customConfig.plugins || defaultConfig.plugins

const appPath = path.join(dir, appDir)
const routes = requireFoolWebpack(path.join(appPath, 'routes'))

const nextConfigSource = path.join(dir, 'next.config')
let customNextConfig = {}
try {
  customNextConfig = requireFoolWebpack(nextConfigSource)
} catch {
  console.log('Using default next.js config')
}

const nextConfig = {
  ...customNextConfig,
  dir: appDir,
  distDir: nextDistDir,
  assetPrefix: '',
  exportPathMap: () => routes.staticRoutes,
}

const config = {
  app: {
    ...appConfig,
    dir: appDir
  },
  firebase: firebaseConfig,
  functions: {
    ...functionsConfig,
    dir: functionsDir
  },
  next: withTypescript(nextConfig),
  rewrites: rewritesConfig,
  // plugins: pluginsConfig,
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

module.exports = config
