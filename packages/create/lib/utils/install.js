const { exec } = require('child_process');
const Promise = require('promise')
const messages = require('../messages')
const output = require('./output')

module.exports = function install(opts) {
  const projectName = opts.projectName
  const projectPath = opts.projectPath

  const installCmd = "npm install"

  console.log(messages.installing())

  return new Promise(function(resolve, reject) {
    const stopInstallSpinner = output.wait('Installing modules')

    exec(installCmd, { cwd: projectPath }, function (err) {
      if (err) {
        console.log(err)
        stopInstallSpinner()
        console.log(messages.installError())
        return reject(new Error(`${installCmd} installation failed`))
      }

      stopInstallSpinner()
      output.success(`Installed dependencies for ${projectName}`)
      resolve()
    });
  })
}
