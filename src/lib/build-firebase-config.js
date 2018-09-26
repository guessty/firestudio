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

const generateJSON = (config, functionsDistDir) => {
  const customFunctions = requireFoolWebpack(`${functionsDistDir}/functions`)
  const customFunctionKeys = Object.keys(customFunctions) || []
  const additionalRewrites = customFunctionKeys.map((key) => {
    return {
      source: `/functions/${key}`,
      function: key,
    }
  })

  const defaultConfig = {
    functions: {
      source: 'functions'
    },
    hosting: {
      public: 'public',
      ignore: [
        'firebase.json',
        '**/.*',
        '**/node_nodules/**'
      ],
      rewrites: [
        ...additionalRewrites,
        {
          source: '**/**',
          function: 'firestudioApp'
        }
      ]
    }
  }

  const firestoreConfig = config.firestore ? { firestore: config.firestore } : {}
  const storageConfig = config.storage ? { storage: config.storage } : {}

  const jsonConfig = JSON.stringify({
    ...defaultConfig,
    ...firestoreConfig,
    ...storageConfig
  })

  return jsonConfig
}

export default async function generateFirebaseFiles (config, distDir, functionsDistDir) {
  writeFileSync(path.join(distDir, '.firebaserc'), generateFirebasrc(config), 'utf8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log(".firebaserc was saved!");
    }
  })
  writeFileSync(path.join(distDir, 'firebase.json'), generateJSON(config, functionsDistDir), 'utf8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("firebase.json was saved!");
    }
  })
}