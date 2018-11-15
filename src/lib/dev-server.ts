import * as path from 'path'
const express = require('express')
const next = require('next')
const requireFoolWebpack = require('require-fool-webpack')
//
import buildRoutes from './build/routes'
import { default as buildFunctions } from './build/functions'

export default async (currentPath: string, config: any) => {
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

          server.get('*', (req: any, res: any) => {
            return handler(req, res)
          })

          server.listen(port, (err: any) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
          })
        })
        .catch((error: any) => {
          console.log('error', error)
        })
    })
}
