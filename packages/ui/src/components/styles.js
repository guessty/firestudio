const avatar = require('./Avatar/styles');
const clickable = require('./Clickable/styles');
const modal = require('./Modal/styles');
const transition = require('./Transition/styles');
const flex = require('./Flex/styles');
const formfield = require('./Form/Field/styles');

module.exports = config => Object.assign(
  {},
  avatar,
  clickable,
  formfield,
  modal,
  transition,
  flex(config),
);
