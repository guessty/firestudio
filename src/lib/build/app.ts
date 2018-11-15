import * as path from 'path'
const build = require('next/dist/build').default
const exportApp = require('next/dist/export').default
//

export default async function buildApp (currentPath: string, config: any) {
  const appPath = path.join(currentPath, config.app.dir)
  const publicDistPath = path.join(currentPath, config.dist.public.dir)
  await build(appPath, config.next)
  console.log('|- built core app!')
  await exportApp(appPath, { outdir: publicDistPath }, config.next)
  console.log('|- exported static pages!')
}