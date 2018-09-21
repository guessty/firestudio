const initRouter = require('firestudio/router')
const routes = [
  { name: 'home', pattern: '/', page: '/' },
  { name: 'about', pattern: '/about', page: '/about' },
  { name: 'pre-rendering', pattern: '/pre-rendering', page: '/pre-rendering' },
  { name: 'cloud-renderng', pattern: '/cloud-rendering/:slug', page: '/cloud-rendering', prerender: false },
]
//
module.exports = initRouter(routes)
