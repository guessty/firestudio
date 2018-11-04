import { writeFileSync } from 'fs'
import path from 'path'
const requireFoolWebpack = require('require-fool-webpack')
//

const generateFirebasrc = (config) => {
  const firebaserc = JSON.stringify({
    projects: {
      default: config.firebase.projectId
    }
  }, null, 2)
  
  return firebaserc
}

const generateJSON = async (config, functionsDistDir) => {

  const configRewrites = config.rewrites || []

  const getDynamicSource = (route) => {
    const splitRoute = route.split('/')
    return splitRoute.map((element) => {
      return element.includes(':') ? '**' : element
    }).join('/')
  }

  const getRewrites = async () => {
    const staticRewrites = []
    const dynamicRewrites = []

    config.routes.forEach((route) => {
      if (route.pattern.includes('/:')) {
        const source = getDynamicSource(route.pattern)
        dynamicRewrites.push({
          source,
          destination: '/client-redirect.html',
        })
      } else {
        const source = route.pattern
        const expression = /(.html|.json)/
        const destination = expression.test(source) ? source : path.join(source, 'index.html')
        staticRewrites.push({
          source,
          destination,
        })
      }
    })
    return {
      staticRewrites,
      dynamicRewrites,
    }
  }
  
  const appRewrites = await getRewrites()

  // const clientRewrites = Object.keys(config.routes.client).map((route) => {
  //   const source = route.split(':slug').join('**')
  //   return {
  //     source,
  //     destination: '/_client-rerouter.html'
  //   }
  // })

  // const cloudRewrites = Object.keys(config.routes.cloud).map((route) => {
  //   const source = route.split(':slug').join('**')
  //   return {
  //     source,
  //     function: 'firestudioApp'
  //   }
  // })

  // // added specific rewrite for static routes in order to support serve.js
  // const staticRewrites = Object.keys(config.routes.static).map((route) => {
  //   const expression = /(.html|.json)/
  //   const destination = expression.test(route) ? route : path.join(route, 'index.html')
  //   return {
  //     source: route,
  //     destination
  //   }
  // })

  let customFunctions = {}
  try {
    customFunctions = requireFoolWebpack(`${functionsDistDir}/functions`)
  } catch {
    console.log('> no custom functions to rewrite')
  }
  const functionRewrites = Object.keys(customFunctions).map((key) => {
    return {
      source: `/api/functions/${key}`,
      function: key,
    }
  })
  
  const firebaseRewrites = [
    ...configRewrites,
    // ...cloudRewrites,
    // ...clientRewrites,
    ...appRewrites.dynamicRewrites,
    ...functionRewrites,
  ]

  const serveRewrites =[
    ...appRewrites.staticRewrites,
    ...configRewrites,
    ...appRewrites.dynamicRewrites,
    // ...cloudRewrites,
    // ...clientRewrites,
    ...functionRewrites,
  ]

  const firebaseHostingConfig = {
    hosting: {
      public: 'public',
      ignore: [
        'firebase.json',
        '**/.*',
        '**/node_nodules/**'
      ],
      rewrites: firebaseRewrites
    }
  }
  const firebaseFunctionsConfig = config.functions.enabled ? { functions: { source: 'functions' } } : {}

  const firebaseJSONConfig = JSON.stringify({
    ...firebaseHostingConfig,
    ...firebaseFunctionsConfig,
  }, null, 2)

  const serveJSONConfig = JSON.stringify({
    rewrites: serveRewrites
  })

  return {
    firebase: firebaseJSONConfig,
    serve: serveJSONConfig
  }
}

export default async function buildDeploymentConfig (currentPath, config) {
  const distDir = path.join(currentPath, config.dist.dir)
  const functionsDistDir = path.join(currentPath, config.dist.functions.dir)

  await writeFileSync(path.join(distDir, '.firebaserc'), generateFirebasrc(config), 'utf8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("|- .firebaserc was saved!");
    }
  })

  const JSONConfig = await generateJSON(config, functionsDistDir)

  await writeFileSync(path.join(distDir, 'firebase.json'), JSONConfig.firebase, 'utf8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("|- firebase.json was saved!");
    }
  })

  await writeFileSync(path.join(distDir, '/public/serve.json'), JSONConfig.serve, 'utf8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("|- serve.json was saved!");
    }
  })
}