import path from 'path'
import { createServer } from 'http'
const requireFoolWebpack = require('require-fool-webpack')
//
import libApp from './app'
import libConfig from './config'

module.exports = (dir) => {
  const nextDir = path.join(dir, libConfig.appDir)
  const router = requireFoolWebpack(path.join(nextDir, 'router'))
  const port = parseInt(process.env.PORT, 10) || 3000
  const dev = process.env.NODE_ENV !== 'production'
  const app = libApp({ dir: nextDir, dev, conf: {...libConfig.next, distDir: `./../../tmp/dev-build`} })
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
