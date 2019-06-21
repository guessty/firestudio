module.exports = {
  '.loader': {
    position: 'relative',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    width: '100%',
    height: '100%',
    color: 'inherit',

    '&__spinner, &__spinner:before, &__spinner:after': {
      'border-radius': '50%',
      width: '1rem',
      height: '1rem',
      'animation-fill-mode': 'both',
      animation: 'loader-pulse 1.8s infinite ease-in-out',
    },

    '&__spinner': {
      color: 'currentColor',
      position: 'relative',
      'animation-delay': '-0.16s',
      transform: 'translateY(-1rem)',

      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '0',
      },

      '&:before': {
        left: '-1.6rem',
        'animation-delay': '-0.32s',
      },

      '&:after': {
        left: '1.6rem',
      }
    }
  },

  '@keyframes loader-pulse': {
    '0%, 80%, 100%': {
      'box-shadow': '0 1rem 0 -1.3em',
    },
    '40%': {
      'box-shadow': '0 1rem 0 0',
    },
  },
};
