const path = require('path')
const requireFoolWebpack = require('require-fool-webpack')
//
const initRouter = require('./dist/lib/router')
const config = require('./dist/lib/config')


const appDir = path.join(path.resolve('.'), config.appDir)

const routes = requireFoolWebpack(path.join(appDir, 'config/routes'))

module.exports = initRouter(routes)
