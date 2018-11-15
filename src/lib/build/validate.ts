import * as path from 'path'
import { existsSync } from 'fs'
const  printAndExit = require('next/dist/server/lib/utils').printAndExit
//

export default async function validate (currentPath: string, config: any) {
  const pagesDir = path.join(currentPath, config.app.dir, 'pages')
  const functionsDir = path.join(currentPath, config.functions.dir)

  // Check for '/pages' directory in '<root>/src/app'
  if (!existsSync(pagesDir)) {
    if (existsSync(path.join(pagesDir, '..', 'pages'))) {
      printAndExit(`> No '/pages' directory found. Are you sure you\'re in the correct directory?`)
    } 

    printAndExit(`> No '/pages' directory found in '${config.app.dir}'. Please create one to continue.`)
  }

  // Check for '/functions' directory in '<root>/src' if functions are enabled
  if (existsSync(functionsDir)
    && !existsSync(path.join(functionsDir, 'index.js'))
    && !existsSync(path.join(functionsDir, 'index.ts' ))
  ) {
    printAndExit(`> No index file found in '/src/functions' directory. Please create one to continue.`)
  }
}

