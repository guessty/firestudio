import path from 'path'
import { createServer } from 'http'
const requireFoolWebpack = require('require-fool-webpack')
//
import libApp from './app'
import libConfig from './config'
import initRouter from './router'

module.exports = (dir) => {
  const nextDir = path.join(dir, libConfig.appDir)
  const routes = requireFoolWebpack(path.join(nextDir, 'config/routes'))
  const router = initRouter(routes)
  const port = parseInt(process.env.PORT, 10) || 3000
  const dev = process.env.NODE_ENV !== 'production'
  const app = libApp({ dir: nextDir, dev, conf: libConfig.nextConfig })
  const handler = router.getRequestHandler(app)

  app.prepare()
    .then(() => {
      createServer(handler)
      .listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
    })
    .catch((error) => {
      console.log('error', error)
    })
}
