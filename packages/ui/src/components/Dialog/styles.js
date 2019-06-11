module.exports = (theme) => {
  const padding = theme('padding');
  const screens = theme('screens');
  const colors = theme('colors');

  return {
    '.dialog': {
      'z-index': '30',
      position: 'fixed',
      display: 'none',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',

      '& > *': {
        display: 'flex',
        'flex-direction': 'column',
        'pointer-events': 'none',
        height: '100%',
      },

      '&__overlay': {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        'pointer-events': 'none',
        color: 'inherit',

        '&:before': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          'pointer-events': 'none',
          opacity: '0.75',
          'background-color': 'currentColor',
        },
      },

      '&__window': {
        position: 'relative',
        display: 'flex',
        'flex-direction': 'column',
        'flex-grow': '1',
        'align-items': 'center',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        'pointer-events': 'none',

        '& > *': {
          'pointer-events': 'all',
        },
      },

      '&__container': {
        position: 'relative',
        display: 'flex',
        'justify-content': 'center',
        width: '100%',
        'pointer-events': 'none',
        padding: padding['6'],

        [`@media (min-width: ${screens.sm})`]: {
          'align-items': 'center',
          'flex-grow': '1',
        },
      },

      '&__content': {
        position: 'relative',
        display: 'flex',
        'flex-direction': 'column',
        width: '100%',
        'pointer-events': 'auto',
        padding: padding['6'],
        'max-width': screens.sm,
        'background-color': colors['grey-lighter'] || '#F1F5F8',
        outline: 'none',

        [`@media (min-width: ${screens.sm})`]: {
          padding: padding['12'],
        },
      },

      '&--visible': {
        display: 'block',
      },
    },
  };
}
