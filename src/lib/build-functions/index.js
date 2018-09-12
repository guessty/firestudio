const webpack = require('webpack')
const path = require('path')
//

export default async function build (dir) {
  try {
    await runCompiler({
      entry: path.join(dir, 'functions')
    })
  } catch (err) {
    console.error(`> Failed to build`)
    throw err
  }
}

function runCompiler (config) {
  return new Promise(async (resolve, reject) => {
    const webpackCompiler = await webpack(config)
    webpackCompiler.run((err, stats) => {
      if (err) return reject(err)

      const jsonStats = stats.toJson('errors-only')

      if (jsonStats.errors.length > 0) {
        const error = new Error(jsonStats.errors[0])
        error.errors = jsonStats.errors
        error.warnings = jsonStats.warnings
        return reject(error)
      }

      resolve()
    })
  })
}
