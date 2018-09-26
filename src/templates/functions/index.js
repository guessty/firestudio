import * as functions from 'firebase-functions'
//
const libApp = require('firestudio/dist/lib/app')
const router = require('./router')

export const firestudioApp = functions.https.onRequest((request, response) => {
  const app = libApp({ dev: false, conf: { distDir: 'app' } })
  const handler = router.getRequestHandler(app)
  console.log('File: ' + request.originalUrl) // eslint-disable-line no-console
  return app.prepare().then(() => handler(request, response))
})

export * from './functions'
