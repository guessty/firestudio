import path from 'path'
import { printAndExit } from 'next/dist/lib/utils'
import { existsSync } from 'fs'
//

export default async function validate (currentPath, config) {
  const srcDir = path.join(currentPath, 'src')
  const appDir = path.join(srcDir, 'app')
  const pagesDir = path.join(appDir, 'pages')
  const routerSource = path.join(appDir, 'router.js')
  const functionsDir = path.join(srcDir, 'functions')
  // const pluginsDir = path.join(srcDir, 'plugins')

  // Check for '/src' directory in '<rootDir>'
  if (!existsSync(srcDir)) {
    printAndExit(`> No '/src' directory found in poject root directory. Please create one to continue.`)
  }

  // Check for '/app' directory  in '<rootDir>/src'
  if (!existsSync(appDir)) {
    printAndExit(`> No '/app' directory found in '/src'. Please create one to continue.`)
  }

  // Check for '/pages' directory in '<root>/src/app'
  if (!existsSync(pagesDir)) {
    if (existsSync(path.join(appDir, '..', 'pages'))) {
      printAndExit(`> No '/pages' directory found. Are you sure you\'re in the correct directory?`)
    }

    printAndExit(`> No '/pages' directory found in '/src/app'. Please create one to continue.`)
  }

  // Check 'router.js' has been added in '<root>/src/app'
  if (!existsSync(routerSource)) {
    printAndExit(`> Cannot find a router: ${routerSource}`)
  }

  // Check for '/functions' directory in '<root>/src' if functions are enabled
  if (existsSync(functionsDir)
    && !existsSync(path.join(functionsDir, 'index.js'))
    && !existsSync(path.join(functionsDir, 'index.ts' ))
  ) {
    printAndExit(`> No index file found in '/src/functions' directory. Please create one to continue.`)
  }

  // // Check for '/plugins' directory in '<root>/src' if plugins are enabled
  // if (config.plugins.length && !existsSync(pluginsDir)) {
  //   printAndExit(`> No '/plugins' directory found in '/src'. Please create one to continue.`)
  // }
}

