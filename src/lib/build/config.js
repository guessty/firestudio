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

const createRouteMethodMap = async (routes) => {
  const withDefaults = (route) => ({
    renderMethod: 'client',
    ...route
  })
  
  const allRoutes = [
    ...routes,
    { pattern: '/404.html', page: '/_404' },
    { pattern: '/_client-rerouter.html', page: '/_client-rerouter'},
  ]

  const routeMap = {
    client: {},
    cloud: {},
    static: {}
  }
  
  allRoutes.forEach((route) => {
    const routeWithDefaults = withDefaults(route)
    if (routeWithDefaults.renderMethod === 'static'
      || routeWithDefaults.page === '/_client-rerouter'
      || routeWithDefaults.page === '/_404') {
      routeMap.static[routeWithDefaults.pattern] = { page: routeWithDefaults.page }
    } else if (routeWithDefaults.renderMethod === 'cloud') {
      routeMap.cloud[routeWithDefaults.pattern] = { page: routeWithDefaults.page }
    } else {
      routeMap.client[routeWithDefaults.pattern] = { page: routeWithDefaults.page }
    }
  })

  return routeMap
}

const buildConfig = async () => {
  // Loading configuration
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
    routes: [],
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
  const routesConfig = customConfig.routes || defaultConfig.routes
  // const pluginsConfig = customConfig.plugins || defaultConfig.plugins
  
  const nextConfigSource = path.join(dir, 'next.config')
  let customNextConfig = {
    publicRuntimeConfig: {}
  }
  try {
    customNextConfig = requireFoolWebpack(nextConfigSource)
  } catch {
    console.log('Using default next.js config')
  }

  // Building Routes
  const routeMap = await createRouteMethodMap(routesConfig)

  console.log(__dirname)
  
  // Define Next Configuration
  const nextConfig = {
    ...customNextConfig,
    dir: appDir,
    distDir: nextDistDir,
    assetPrefix: '',
    exportPathMap: () => routeMap.static,
    generateBuildId: async () => {
      return 'build'
    },
    publicRuntimeConfig: {
      ...customNextConfig.publicRuntimeConfig,
      routesConfig,
      routeRenderMethods: routeMap,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
      // Perform customizations to webpack config
      // Important: return the modified config
      if (customNextConfig.webpack) {
        config = customNextConfig.webpack(config, { buildId, dev, isServer, defaultLoaders })
      }
      const coreEntry = config.entry
      const entry = async () => {
        return {
          ... await coreEntry(),
          'static/build/pages/_client-rerouter.js': [ path.join(__dirname, '..', '..', 'lib/pages/client-rerouter.js') ],
          'static/build/pages/_404.js': [ path.join(__dirname, '..', '..', 'lib/pages/404.js') ]
        }
      }
      config.entry = entry
      return config
    },
  }
  
  // Return App Configuration
  return {
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
    routes: {
      raw: routesConfig,
      ...routeMap
    },
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
}

module.exports = buildConfig
