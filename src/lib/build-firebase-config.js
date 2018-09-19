import { writeFileSync } from 'fs'
import path from 'path'
//

const generateFirebasrc = (config) => {
  const firebaserc = JSON.stringify({
    projects: {
      default: config.projectId
    }
  })
  
  return firebaserc
}

const generateJSON = (config) => {
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

export default async function generateFirebaseFiles (config, distDir) {
  writeFileSync(path.join(distDir, '.firebaserc'), generateFirebasrc(config), 'utf8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log(".firebaserc was saved!");
    }
  })
  writeFileSync(path.join(distDir, 'firebase.json'), generateJSON(config), 'utf8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("firebase.json was saved!");
    }
  })
}