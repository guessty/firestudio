import path from 'path'
import express from 'express'
import next from 'next'
const requireFoolWebpack = require('require-fool-webpack')
//
import buildFunctions from './build/functions'
import buildRoutes from './build/routes'

export default async (currentPath, config) => {
  const devDistDir = path.join(currentPath, 'tmp')

  buildFunctions(currentPath, config, true)
    .then(async () => {
      const nextDir = path.join(currentPath, config.app.dir)
      const devNextDistDir = path.relative(nextDir, devDistDir)
      const routes = await buildRoutes(config.routes)
      const port = parseInt(process.env.PORT, 10) || 3000
      const app = next({
        dev: true,
        dir: nextDir,
        conf: {...config.next, distDir: devNextDistDir},
      })
      const handler = routes.getRequestHandler(app)
      const customFunctions = requireFoolWebpack(`${devDistDir}/functions`)
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
