// See https://tailwindcss.com
/* eslint-disable quote-props */

const defaultConfig = require('tailwindcss/defaultConfig')();
const firestudioUi = require('@firestudio/ui/dist/styles');

module.exports = {
  ...defaultConfig,

  screens: {
    'sm': '576px',
    'md': '768px',
    'lg': '992px',
    'xl': '1200px',
  },

  maxWidth: {
    'sm': '576px',
    'md': '768px',
    'lg': '992px',
    'xl': '1200px',
    '1/4': '25%',
    '1/2': '50%',
    '3/4': '75%',
    'full': '100%',
    'screen': '100vw',
  },

  minHeight: {
    '0': '0',
    '12': '3rem',
    '16': '4rem',
    '24': '6rem',
    '32': '8rem',
    '48': '12rem',
    '64': '16rem',
    '80': '20rem',
    'full': '100%',
    'screen': '100vh',
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

  fontWeights: {
    'normal': 400,
    'medium': 500,
    'semibold': 600,
    'bold': 700,
  },

  shadows: {
    'box': '0 2px 5px 0 rgba(0,0,0,.2)',
    'box-lg': '0 4px 12px 0 rgba(0,0,0,.12)',
    'hover': '0 0 3px rgba(0,0,0,.12)',
    'text': '0 2px 5px rgba(0,0,0,.5)',
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

  textShadows: {
    'text-shadow-white': '0 2px 5px rgba(255,255,255,.5)',
    'text-shadow-black': '0 2px 5px rgba(0,0,0,.5)',
    'text-shadow-none': 'none',
  },

  plugins: defaultConfig.plugins.concat([
    ({ addUtilities, addComponents, config }) => {
      const utilitiesExport = {};
      const componentsExport = {};

      // Prefixed utilities
      [
        ['.trans', 'transition', config('transitions')],
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

      // Shadows with no prefix
      const textShadows = config('textShadows');
      Object.keys(textShadows).forEach((variation) => {
        utilitiesExport[`.${variation}`] = {
          'text-shadow': textShadows[variation],
        };
      });

      addUtilities(utilitiesExport, {
        variants: ['responsive', 'hover'],
      });


      // Components
      addComponents(firestudioUi(config));
      addComponents({
        '@variants responsive': componentsExport,
      });
    },
  ]),
};
