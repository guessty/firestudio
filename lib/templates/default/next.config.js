const withSPA = require('next-spa').withSPA
const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')

module.exports = withCSS(withSPA(withTypescript({
  distDir: './dist/build',
  nextSPA: {
    fallback: 'fallback.html'
  },
  nextFire: {
    projectId: 'upkeep-dev'
  }
})))
