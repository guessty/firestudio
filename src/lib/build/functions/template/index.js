import * as functions from 'firebase-functions'
//
import * as appFunctions from './functions'
const App = require('firestudio')
const router = require('./router')
//

const firestudioApp = (request, response) => {
  const app = App({ dev: false, conf: { distDir: 'app' } })
  const handler = router.getRequestHandler(app)
  console.log('File: ' + request.originalUrl) // eslint-disable-line no-console
  return app.prepare().then(() => handler(request, response))
}

if (Object.keys(router.cloudRoutes).length) {
  Object.defineProperty(exports, 'firestudioApp', {
    enumerable: true,
    get: function get() {
      return functions.https.onRequest(firestudioApp)
    }
  }) 
}

Object.keys(appFunctions).forEach((key) => {
  if (key === "default" || key === "__esModule") return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return functions.https.onRequest(appFunctions[key])
    }
  })
})
