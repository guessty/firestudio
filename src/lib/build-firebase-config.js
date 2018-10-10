import { writeFileSync } from 'fs'
import path from 'path'
const requireFoolWebpack = require('require-fool-webpack')
//

const generateFirebasrc = (config) => {
  const firebaserc = JSON.stringify({
    projects: {
      default: config.projectId
    }
  })
  
  return firebaserc
}

const generateJSON = (config, functionsDistDir, routerSource) => {
  const configRewrites = config.hostingRewrites || []

  let rewrites = []
  if (config.incFunctions) {
    const customFunctions = requireFoolWebpack(`${functionsDistDir}/functions`)
    const customFunctionKeys = Object.keys(customFunctions) || []
    const customFunctionRewrites = customFunctionKeys.map((key) => {
      return {
        source: `/functions/${key}`,
        function: key,
      }
    })
    rewrites = [
      ...configRewrites,
      ...customFunctionRewrites,
      {
        source: '**/**',
        function: 'firestudioApp'
      }
    ]
  } else {
    const appRouter = requireFoolWebpack(`${routerSource}`)
    const dynamicRoutes = appRouter.dynamicRoutes || []
    const clientRewrites = Object.keys(dynamicRoutes).map((route) => {
      const source = route.split(':slug').join('**')
      return {
        source,
        destination: '/client-router/index.html'
      }
    })
    rewrites = [
      ...configRewrites,
      ...clientRewrites,
    ]
  }

  const hostingConfig = {
    hosting: {
      public: 'public',
      ignore: [
        'firebase.json',
        '**/.*',
        '**/node_nodules/**'
      ],
      rewrites
    }
  }

  const functionsConfig = config.incFunctions ? { functions: { source: 'functions' } } : {}
  const firestoreConfig = config.firestore ? { firestore: config.firestore } : {}
  const storageConfig = config.storage ? { storage: config.storage } : {}

  const jsonConfig = JSON.stringify({
    ...hostingConfig,
    ...functionsConfig,
    ...firestoreConfig,
    ...storageConfig
  })

  return jsonConfig
}

export default async function generateFirebaseFiles (config, distDir, functionsDistDir, routerSource) {
  writeFileSync(path.join(distDir, '.firebaserc'), generateFirebasrc(config), 'utf8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log(".firebaserc was saved!");
    }
  })
  writeFileSync(path.join(distDir, 'firebase.json'), generateJSON(config, functionsDistDir, routerSource), 'utf8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("firebase.json was saved!");
    }
  })
}