module.exports = {
  '.menu': {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    height: '100%',

    '&__popup': {
      position: 'absolute',

      '&--align-right': {
        right: '0',
      }
    },

    '&__list': {
      'list-style': 'none',
      padding: '0',
    },

    '&__hover': {
      display: 'inline-block',
      position: 'relative',
      width: '100%',
      height: '100%',
    },
  },
}
