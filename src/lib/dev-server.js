import path from 'path'
import express from 'express'
import * as functions from 'firebase-functions'
const requireFoolWebpack = require('require-fool-webpack')
//
import libApp from './app'
import libConfig from './config'
import libBuildFunctions from './build-functions'

module.exports = (dir) => {
  const functionsDir = path.join(dir, libConfig.functionsDir)
  const functionsDistDir = path.join(dir, 'tmp')
  
  libBuildFunctions(functionsDir, functionsDistDir)
    .then(() => {
      const nextDir = path.join(dir, libConfig.appDir)
      const router = requireFoolWebpack(path.join(nextDir, 'router'))
      const port = parseInt(process.env.PORT, 10) || 3000
      const app = libApp({
        dev: true,
        dir: nextDir,
        conf: {...libConfig.next, distDir: `./../../tmp/dev-build`},
      })
      const handler = router.getRequestHandler(app)
      const customFunctions = requireFoolWebpack(`${functionsDistDir}/functions`)
      const customFunctionsKeys = Object.keys(customFunctions) || []

      app.prepare()
        .then(() => {
          const server = express()

          customFunctionsKeys.forEach(key => {
            const wrappedFunction = functions.https.onRequest((req, res) => customFunctions[key](req, res))
            server.all(`/functions/${key}`, wrappedFunction)
          })

          server.get('*', (req, res) => {
            return handler(req, res)
          })

          server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
          })
        })
        .catch((error) => {
          console.log('error', error)
        })
    })
}
