const application = require('./Application/styles');
const avatar = require('./Avatar/styles');
const backgroundImage = require('./BackgroundImage/styles');
const carousel = require('./Carousel/styles');
const clickable = require('./Clickable/styles');
const container = require('./Container/styles');
const dialog = require('./Dialog/styles');
const flex = require('./Flex/styles');
const formfield = require('./Form/Field/styles');
const hr = require('./Hr/styles');
const loader = require('./Loader/styles');
const transition = require('./Transition/styles');

module.exports = theme => Object.assign(
  {},
  application,
  avatar,
  backgroundImage,
  carousel,
  clickable,
  container,
  dialog(theme),
  { '@variants responsive': flex(theme) },
  formfield,
  hr,
  loader,
  transition,
);
