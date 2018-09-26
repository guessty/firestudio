import * as functions from 'firebase-functions'
//
import * as appFunctions from './functions'
const libApp = require('firestudio/dist/lib/app')
const router = require('./router')

export const firestudioApp = functions.https.onRequest((request, response) => {
  const app = libApp({ dev: false, conf: { distDir: 'app' } })
  const handler = router.getRequestHandler(app)
  console.log('File: ' + request.originalUrl) // eslint-disable-line no-console
  return app.prepare().then(() => handler(request, response))
})

Object.keys(appFunctions).forEach((key) => {
  if (key === "default" || key === "__esModule") return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return functions.https.onRequest(appFunctions[key])
    }
  })
})

// export * from './functions'
