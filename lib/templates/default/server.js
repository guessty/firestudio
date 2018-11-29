const express = require('express')
const nextSPA = require('next-spa').default

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000
const app = nextSPA({ dev })
const handler = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('*', (req, res) => {
      return handler(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })