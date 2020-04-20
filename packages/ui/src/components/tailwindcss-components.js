const flex = require('./Flex/tailwindcss');

module.exports = theme => Object.assign(
  {},
  { '@variants responsive': flex(theme) },
);
