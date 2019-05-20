module.exports = {
  '.form-field': {
    display: 'flex',
    'flex-direction': 'column',
    'flex-wrap': 'wrap',
    margin: '-0.25rem',
    'z-index': '1',
    'flex-grow': '1',

    '&__container': {
      padding: '0.25rem',
    },

    '&__label': {
      display: 'block',
      cursor: 'pointer',
    },

    '&__input': {
      position: 'relative',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      margin: '0',
      height: '2rem',
      width: '100%',
      'border-width': '1px',
      'border-style': 'solid',
      'border-color': '#d3d3d3',
      'border-radius': '0',
      'background-color': '#ffffff',
      padding: '0 0.75rem',
      'background-position': 'right 0.25rem center',
      'background-repeat': 'no-repeat',
      cursor: 'pointer',
      appearance: 'textfield',
      'box-shadow': '0 0 0 0 rgba(0, 0, 0, 0)',
      'z-index': '1',

      '&:hover, &:focus': {
        'border-color': '#808080',
        'z-index': '2',
      },

      '&[type="checkbox"], &[type="radio"]': {
        width: '1rem',
        height: '1rem',
        padding: '0',

        '&:checked': {
          'background-color': 'currentColor',

          '&:after': {
            content: '"✓"',
            position: 'absolute',
            color: '#ffffff',
          },
        },
      },
    },

    '&--checkbox, &--radio': {
      'flex-direction': 'row-reverse',
      'align-items': 'center',
      'justify-content': 'flex-end',
    },

    '&--is-valid, &--has-error': {
      '.form-field': {
        '&__container, &__input': {
          'border-color': 'inherit',
        },
      },
    },

    '&--is-valid': {
      'border-color': 'var(--ui-field-valid-color, limegreen)',
    },

    '&--has-error': {
      'border-color': 'var(--ui-field-error-color, #cd5c5c)',
    },
  },
};
