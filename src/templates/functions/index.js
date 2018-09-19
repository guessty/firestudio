import * as functions from 'firebase-functions'
//
const libApp = require('firestudio/dist/lib/app')
const router = require('./router')
const dev = process.env.NODE_ENV !== 'production'
const app = libApp({ dev, conf: { distDir: 'app' } })
const handler = router.getRequestHandler(app)

export const firestudioApp = functions.https.onRequest((request, response) => {
  console.log('File: ' + request.originalUrl) // eslint-disable-line no-console
  return app.prepare().then(() => handler(request, response))
})

export * from './functions'
