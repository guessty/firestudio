const path = require('path')
const fs = require('fs')
const ReactDOMServer = require('react-dom/server')
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

const normalizePath = (path: any) => path.replace(/\\/g, '/')

const generateRoutesFromDir = (dir: any, pathString:string = undefined, routes: any = []) => {
  const normalizedPath = normalizePath(dir)
  const stats = fs.statSync(normalizedPath);
  const baseName = path.basename(dir)
  if (stats.isDirectory()) {
    let nextPathString = ''
    if (pathString !== undefined) {
      nextPathString = `${pathString}/${baseName}`
    }
    const children = fs.readdirSync(normalizedPath)

    children.forEach((child: any) => {
      generateRoutesFromDir(path.join(dir, child), nextPathString, routes)
    })
  } else if (stats.isFile()) {
    const fileString = `${pathString}/${baseName}`
    const page = fileString.replace(/\.[^/.]+$/, '')

    if (page === '/index') {
      const route = {
        pattern: '/',
        page: '/',
      }
      routes.push(route)
    } else if (page !== '/_app' && page !== '/_document') {
      const route = {
        pattern: page.replace('/index', '').replace('/_', '/:'),
        page: page.replace('/index', ''),
      }
      routes.push(route)
    }
  }
  return routes
} 

const generateExportPathMap = async (routes: any) => {
  const allRoutes = [
    ...routes,
    { pattern: '/404.html', page: '/404' },
    { pattern: '/client-redirect.html', page: '/client-redirect' },
  ]
  return allRoutes.reduce((routeMap, route) => {
    routeMap[route.pattern] = { page: route.page }
    return routeMap
  }, {})
}

const buildConfig = async () => {
  // Loading configuration
  const defaultConfig: any = {
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
    cloudRenderAllDynamicRoutes: false,
    cloudRenderedRoutes: [],
  }
  
  const configSource = path.join(dir, 'firestudio.config')
  let customConfig = defaultConfig
  try {
    customConfig = requireFoolWebpack(configSource)
  } catch {
    console.log('Using default app config')
  }
  
  const appConfig = defaultConfig.app
  const functionsConfig = defaultConfig.functions
  const firebaseConfig = customConfig.firebase || defaultConfig.firebase
  const rewritesConfig = customConfig.rewrites || defaultConfig.rewrites
  const cloudRenderedRoutes =
    customConfig.cloudRenderedRoutes || defaultConfig.cloudRenderedRoutes
  const cloudRenderAllDynamicRoutes =
    customConfig.cloudRenderAllDynamicRoutes || defaultConfig.cloudRenderAllDynamicRoutes
  
  const nextConfigSource = path.join(dir, 'next.config')
  let customNextConfig: any = {
    publicRuntimeConfig: {}
  }
  try {
    customNextConfig = requireFoolWebpack(nextConfigSource)
  } catch {
    console.log('Using default next.js config')
  }

  // Building Routes
  const routes = generateRoutesFromDir(path.join(appDir, 'pages'))

  const exportPathMap = await generateExportPathMap(routes)
  
  // Define Next Configuration
  const nextConfig = {
    ...customNextConfig,
    dir: appDir,
    distDir: nextDistDir,
    assetPrefix: '',
    exportPathMap: () => exportPathMap,
    generateBuildId: async () => {
      return 'build'
    },
    publicRuntimeConfig: {
      ...customNextConfig.publicRuntimeConfig,
      routes,
    },
    webpack: (config: any, { buildId, dev, isServer, defaultLoaders }: any) => {
      // Perform customizations to webpack config
      // Important: return the modified config
      if (customNextConfig.webpack) {
        config = customNextConfig.webpack(config, { buildId, dev, isServer, defaultLoaders })
      }
      const coreEntry = config.entry
      const entry = async () => {
        return {
          ... await coreEntry(),
          'static/build/pages/client-redirect.js': [ path.join(__dirname, '..', '..', 'lib/pages/client-redirect.js') ],
          'static/build/pages/404.js': [ path.join(__dirname, '..', '..', 'lib/pages/404.js') ]
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
    cloudRenderAllDynamicRoutes,
    cloudRenderedRoutes,
    firebase: firebaseConfig,
    functions: {
      ...functionsConfig,
      dir: functionsDir
    },
    next: withTypescript(nextConfig),
    rewrites: rewritesConfig,
    routes,
    exportPathMap,
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
