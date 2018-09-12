import path from 'path'
import { createServer } from 'http'
//
import libApp from './app'
import libConfig from './config'
import libRouter from './router'

module.exports = (dir) => {
  const nextDir = path.join(dir, libConfig.appDir)
  const port = parseInt(process.env.PORT, 10) || 3000
  const dev = process.env.NODE_ENV !== 'production'
  const app = libApp({ dir: nextDir, dev, conf: libConfig })
  const handler = libRouter.getRequestHandler(app)

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
