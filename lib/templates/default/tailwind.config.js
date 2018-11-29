// See https://tailwindcss.com
/* eslint-disable quote-props */

const defaultConfig = require('tailwindcss/defaultConfig')();

const colors = {
  'inherit': 'inherit',
  'transparent': 'transparent',
  'bright-green': '#9EF230',
  'light-green': '#78C414',
  'medium-green': '#53860F',
  'dark-green': '#185C5B',
  'darker-green': '#143A39',
  'cyan': '#15A79A',
  'dark-cyan': '#185C5B',
  'blue': '#00A7FF',
  'orange': '#E49B2E',
  'gray': '#DDD',
  'light-gray': '#F7F7F7',
  'medium-light-gray': '#EDEDED',
  'medium-gray': '#D7D7D7',
  'medium-dark-gray': '#5C5C5C',
  'dark-gray': '#999999',
  'border-gray': '#B1B1B1',
  'red': '#ED322D',
  'error-red': '#D84259',
  'error-pink': 'rgba(216,66,89,0.35)',
  'black': '#1A1A1A',
  'white': '#FFF',
};

module.exports = {
  ...defaultConfig,

  // .error { color: config('colors.red') }
  colors,

  // .{screen}:{utility}
  screens: {
    'sm': '576px',
    'md': '768px',
    'lg': '992px',
    'xl': '1200px',
  },

  fonts: {
    'sans': [
      '"Exo 2"',
      'system-ui',
      'BlinkMacSystemFont',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ],
  },

  textSizes: {
    'xs': '.75rem',
    'sm': '.875rem',
    'base': '1rem', // 16px
    'lg': '1.125rem',
    'xl': '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },

  iconSizes: {
    'xs': '1rem', // 16px
    'sm': '1.25rem', // ~20px
    'default': '1.875rem', // 30px
    'lg': '2.1875rem', // 35px
    'xl': '2.5rem', // 40px
    '2xl': '3.25rem',
    '3xl': '5rem', // 80px
  },

  fontWeights: {
    'normal': 400,
    'medium': 500,
    'semibold': 600,
    'bold': 700,
  },

  textColors: colors,

  backgroundColors: colors,

  borderColors: { default: colors.borderGrey, ...colors },

  shadows: {
    'box': '0 2px 5px 0 rgba(0,0,0,.2)',
    'box-lg': '0 4px 12px 0 rgba(0,0,0,.12)',
    'hover': '0 0 3px rgba(0,0,0,.12)',
    'text': '0 2px 5px rgba(0,0,0,.5)',
  },

  leading: {
    'tight': 0.8,
    'normal': 1.5,
  },

  transitions: {
    'default': 'all .14s ease-out',
  },

  transforms: {
    'scale-0': 'scale(0)',
    'no-transform': 'none',
    'scale': 'scale(1.1)',
    // `push` for forward motion on axis, `pull` for retrograde
    'push-y': 'translateY(1px)',
    'push-x': 'translateX(2px)',
    'push-2x': 'translateX(6px)',
    'pull-y': 'translateY(-1px)',
    'rotate-90': 'rotate(90deg)',
    'rotate-180': 'rotate(180deg)',
    'rotate-270': 'rotate(270deg)',
  },

  plugins: defaultConfig.plugins.concat([
    ({ addUtilities, config }) => {
      const utilitiesExport = {};

      // Prefixed utilities
      [
        ['.trans', 'transition', config('transitions')],
        ['.icon', 'font-size', config('iconSizes')],
      ]
        .forEach(([className, cssProp, variations]) => {
          Object.keys(variations).forEach((variation) => {
            const newUtilityClassName = variation === 'default'
              ? className
              : `${className}-${variation}`;

            utilitiesExport[newUtilityClassName] = {
              [cssProp]: variations[variation],
            };
          });
        });

      // Transforms with no prefix
      const transforms = config('transforms');
      Object.keys(transforms).forEach((variation) => {
        utilitiesExport[`.${variation}`] = {
          transform: transforms[variation],
        };
      });

      addUtilities(utilitiesExport, {
        variants: ['responsive', 'hover'],
      });
    },
  ]),
};
