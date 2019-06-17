module.exports = {
  '.clickable': {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',

    '&--button': {
      'text-align': 'center',
      'text-decoration': 'none',
      'justify-content': 'center',
      padding: '0.5rem 3rem',

      '&:hover, &:focus': {
        outline: 'none',
      },
    },

    '&--link': {
      display: 'inline-block',
    },

    '&--is-raised:not(.clickable--link)': {
      'box-shadow': '0 2px 5px 0 rgba(0,0,0,.2)',

      '&:hover, &:focus': {
        'box-shadow': '0 0 3px rgba(0,0,0,.12)',
        transform: 'translateY(1px)',
      },
    },
  },
};
