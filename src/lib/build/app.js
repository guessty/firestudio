import build from 'next/dist/build'
import exportApp from 'next/dist/export'
import path from 'path'
//

export default async function buildApp (currentPath, config) {
  const appPath = path.join(currentPath, config.app.dir)
  const publicDistPath = path.join(currentPath, config.dist.public.dir)
  await build(appPath, config.next)
  console.log('|- built core app!')
  await exportApp(appPath, { outdir: publicDistPath }, config.next)
  console.log('|- exported static pages!')
}