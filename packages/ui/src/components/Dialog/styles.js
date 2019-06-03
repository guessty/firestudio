module.exports = (config) => {
  const padding = config('padding');
  const screens = config('screens');
  const colors = config('colors');

  return {
    '.dialog': {
      'z-index': '30',
      overflow: 'hidden !important',
      position: 'fixed',
      display: 'none',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',

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
        position: 'fixed',
        width: '100vw',
        'min-height': '100vh',
        display: 'flex',
        'flex-direction': 'column',
        color: 'initial',
        'pointer-events': 'none',
      },

      '&__head': {
        'z-index': '10',
        left: '0',
        top: '0',
        width: '100%',
        'pointer-events': 'all',
      },

      '&__body': {
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

      '&__main': {
        position: 'relative',
        display: 'flex',
        'justify-content': 'center',
        width: '100%',
        'pointer-events': 'none',
        padding: `${padding['24']} ${padding['6']}`,

        [`@media (min-width: ${screens.sm})`]: {
          'align-items': 'center',
          'flex-grow': '1',
          padding: `0 ${padding['6']}`,
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
