import webpack from 'webpack'
import { existsSync } from 'fs'
import path from 'path'
//

export default async function buildFunctions (functionsDir, functionsDistDir) {
  const functionsJSEntry = `${functionsDir}/index.js`
  const functionsTSEntry = `${functionsDir}/index.ts`
  let entry = undefined

  if (existsSync(functionsTSEntry)) {
    entry = functionsTSEntry
  } else if (existsSync(functionsJSEntry)) {
    entry = functionsJSEntry
  }

  if (entry !== undefined) {
    try {
      await runCompiler({
        entry: entry,
        devtool: 'inline-source-map',
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              use: require.resolve('ts-loader'),
              exclude: /node_modules/
            }
          ]
        },
        resolve: {
          extensions: [ '.tsx', '.ts', '.js' ]
        },
        output: {
          filename: 'index.js',
          path: path.join(functionsDistDir, 'functions')
        }
      })
    } catch (err) {
      console.error(`> Failed to build`)
      throw err
    }
  } else {
    console.error(`> No custom functions found`)
  }
}

function runCompiler (webpackConfig) {
  return new Promise(async (resolve, reject) => {
    const webpackCompiler = await webpack(webpackConfig)
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
