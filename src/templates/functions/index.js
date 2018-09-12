import * as functions from 'firebase-functions'
//
const libApp = require('firestudio/lib/app')
const libRouter = require('firestudio/lib/router')

const app = libApp({ dev: false, conf: { distDir: 'app' } })
const handler = libRouter.getRequestHandler(app)

export const firestudioApp = functions.https.onRequest((request, response) => {
  console.log('File: ' + request.originalUrl) // eslint-disable-line no-console
  return app.prepare().then(() => handler(request, response))
})

export * from './functions'
