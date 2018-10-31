import * as functions from 'firebase-functions'
import next from 'next'
import buildRoutes from 'firestudio/lib/build/routes'
//
import * as appFunctions from './functions'
const routes = require('./routes')
const config = require('./next.config')
//

const firestudioApp = (request, response) => {
  const appRoutes = buildRoutes(routes)
  const app = next({ dev: false, conf: Object.assign({}, config, { distDir: 'app' }) })
  const handler = appRoutes.getRequestHandler(app)
  console.log('File: ' + request.originalUrl) // eslint-disable-line no-console
  return app.prepare().then(() => handler(request, response))
}

if (routes.find((route) => route.renderMethod === 'cloud')) {
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
