import path from 'path'
import express from 'express'
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
      const dev = process.env.NODE_ENV !== 'production'
      const app = libApp({ dir: nextDir, dev, conf: {...libConfig.next, distDir: `./../../tmp/dev-build`} })
      const handler = router.getRequestHandler(app)
      const customFunctions = requireFoolWebpack(`${functionsDistDir}/functions`)
      const customFunctionsKeys = Object.keys(customFunctions) || []

      app.prepare()
        .then(() => {
          const server = express()

          customFunctionsKeys.forEach(key => {
            server.all(`/functions/${key}`, (req, res) => {
              return customFunctions[key](req, res)
            })
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
