const withSPA = require('next-spa').withSPA
const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')
const withSASS = require('@zeit/next-sass')

module.exports = withSASS(withCSS(withSPA(withTypescript({
  distDir: './dist/build',
  nextSPA: {
    fallback: 'fallback.html'
  },
  nextFire: {
    projectId: '<projectId>',
    cloudRenderAllDynamicRoutes: true,
  }
}))))
