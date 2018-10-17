import path from 'path'
import express from 'express'
const requireFoolWebpack = require('require-fool-webpack')
//
import firestudioApp from './app'
import config from './build/config'
import buildFunctions from './build/functions'

module.exports = (currentPath) => {
  const functionsDistDir = path.join(currentPath, 'tmp')
  
  buildFunctions(currentPath, config, true)
    .then(() => {
      const nextDir = path.join(currentPath, config.app.dir)
      const router = requireFoolWebpack(path.join(nextDir, 'router'))
      const port = parseInt(process.env.PORT, 10) || 3000
      const app = firestudioApp({
        dev: true,
        dir: nextDir,
        conf: {...config.app.next, distDir: `./../../tmp/app`},
      })
      const handler = router.getRequestHandler(app)
      const customFunctions = requireFoolWebpack(`${functionsDistDir}/functions`)
      const customFunctionsKeys = Object.keys(customFunctions) || []

      app.prepare()
        .then(() => {
          const server = express()

          customFunctionsKeys.forEach(key => {
            server.all(`/api/functions/${key}`, customFunctions[key])
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
