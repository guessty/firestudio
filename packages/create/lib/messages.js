const chalk = require('chalk')
const output = require('./utils/output')

const program = {
  name: 'firepress',
  create: 'create'
}

exports.help = function() {
  return `
    Only ${chalk.green('<project-directory>')} is required.

    If you have any problems, do not hesitate to file an issue:
      ${chalk.cyan('https://github.com/guessty/firepress/issues/new')}
  `
}

exports.missingProjectName = function() {
  return `
Please specify the project directory:

  ${chalk.cyan(program.name)} ${chalk.cyan(program.create)} ${chalk.green('<project-directory>')}

For example:

  ${chalk.cyan(program.name)} ${chalk.cyan(program.create)} ${chalk.green('my-firepress-app')}

Run ${chalk.cyan(`${program.name} --help`)} to see all options.
`
}

exports.alreadyExists = function(projectName) {
  return `
Uh oh! Looks like there's already a directory called ${chalk.red(
    projectName
  )}. Please try a different name or delete that folder.`
}

exports.installing = function() {
  return 'Installing npm modules...'
}

exports.installError = function() {
  output.error('Failed to install. Try manually installing within the project directory.')
}

exports.copying = function(projectName) {
  return `
Creating ${chalk.bold(chalk.green(projectName))}...
`
}

exports.start = function(projectName) {

  const commands = {
    install: 'npm i',
    dev: 'npm run dev',
  }

  return `
  ${chalk.green('Awesome!')} You're now ready to start playing with fire.

  Your next steps are:

  Navigate to your project:
  $ ${output.cmd(`cd ${projectName}`)}

  Start a development environment:
  $ ${output.cmd(commands.dev)}

  The template you installed comes with all the documentation you need to help you finish setting up your app.

  If you have any problems, do not hesitate to file an issue:
  ${chalk.green('https://github.com/guessty/firepress/issues/new')}
`
}
