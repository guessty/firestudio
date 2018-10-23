import build from 'next/dist/build'
import exportApp from 'next/dist/export'
import path from 'path'
//

export default async function buildApp (currentPath, config) {
  const appPath = path.join(currentPath, config.app.dir)
  const publicDistPath = path.join(currentPath, config.dist.public.dir)
  console.log('Building App...')
  await build(appPath, config.next)
  console.log('Build Successful')
  console.log('Exporting Static Pages...')
  await exportApp(appPath, { outdir: publicDistPath }, config.next)
  console.log('Export Successful')
}