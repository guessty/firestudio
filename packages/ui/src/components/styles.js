const avatar = require('./Avatar/styles');
const clickable = require('./Clickable/styles');
const dialog = require('./Dialog/styles');
const transition = require('./Transition/styles');
const flex = require('./Flex/styles');
const loader = require('./Loader/styles');
const formfield = require('./Form/Field/styles');

module.exports = config => Object.assign(
  {},
  { '@variants responsive': flex(config) },
  avatar,
  clickable,
  formfield,
  loader,
  dialog(config),
  transition,
);
