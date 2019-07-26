module.exports = (variables) => ({
  '.carousel': {
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',

    '&__slider': {
      display: 'flex',
      width: '100%',
      overflow: 'hidden',
      opacity: '0',

      '&.slick-initialized': {
        opacity: '1',

        '.slick-track': {
          overflow: 'visible',
        },
      },

      '.slick-list': {
        display: 'flex',
        width: '100%',
      },

      '.slick-track': {
        display: 'flex',
        'align-items': 'center',
        'flex-direction': 'row',
        width: '100%',
        overflow: 'hidden',
      },

      '.slick-slide': {
        width: '100%',
        float: 'none',

        '& > div': {
          height: '100%',
        },
      },

      '.slick-dots': {
        position: 'absolute',
        display: 'block',
        'text-align': 'center',
        width: '100%',
        bottom: '1rem',

        [`@media (min-width: ${variables.screens.sm})`]: {
          bottom: '2rem',
        },

        li: {
          position: 'relative',
          display: 'inline-block',
          cursor: 'pointer',
          padding: '0',
          'margin-left': '.25rem',
          'margin-right': '.25rem',
          width: '1.25rem',
          height: '1.25rem',

          button: {
            display: 'block',
            cursor: 'pointer',
            outline: 'none',
            'background-color': 'transparent',
            color: 'transparent',
            border: 'none',
            padding: '.25rem',
            width: '1.25rem',
            height: '1.25rem',

            '&:hover, &:focus': {
              outline: 'none',

              '&:before': {
                opacity: '1',
              },
            },

            '&:before': {
              position: 'absolute',
              'text-align': 'center',
              color: '#000000',
              opacity: '.25',
              top: '0',
              left: '0',
              content: '"•"',
              width: '1.25rem',
              height: '1.25rem',
              'font-family': 'initial',
              'line-height': '1.25rem',
              'text-shadow': '0 2px 5px rgba(0,0,0,.5)',
            },
          },

          '&.slick-active button:before': {
            opacity: '.75',
            color: '#000000',
          },
        },
      },
    },

    '&__prev, &__next': {
      position: 'absolute',
      display: 'flex',
      top: '0',
      color: '#ffffff',
      opacity: '.5',
      'align-items': 'center',
      padding: '.5',
      height: '100%',
      width: '6rem',

      '&:hover': {
        opacity: '1',
      },
    },

    '&__next': {
      right: '0',
      'justify-content': 'flex-end',
      background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 100%)',

      svg: {
        transform: 'rotate(180deg)',
      },
    },

    '&__prev': {
      left: '0',
      'justify-content': 'flex-start',
      'z-index': '10',
      background: 'linear-gradient(to right, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0) 100%)',
    },

    '&__item': {
      display: 'flex !important',
      'flex-direction': 'column',
      position: 'relative',
      height: '100%',

      '& > *': {
        height: '100%',
      },
    },

    '&--has-dots': {
      '.carousel__item > *': {
        'padding-bottom': '2rem',

        [`@media (min-width: ${variables.screens.sm})`]: {
          'padding-bottom': '6rem',
        },
      },
    },
  },
});
