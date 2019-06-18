// See https://tailwindcss.com
/* eslint-disable quote-props */

const firestudioUi = require('@firestudio/ui/dist/styles');

module.exports = {
  theme: {
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

    extend: {
      screens: {
        'max-sm': { max: '639px' },
        'max-md': { max: '767px' },
        'max-lg': { max: '1023px' },
        'max-xl': { max: '1279px' },
      },

      zIndex: {
        '1': 1,
      },
    },
  },

  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'hocus'],
    opacity: ['responsive', 'hover', 'focus', 'hocus'],
  },

  plugins: [
    require('tailwindcss-interaction-variants')(),
    ({ addUtilities, addComponents, theme }) => {
      const utilitiesExport = {};

      // Prefixed utilities
      [
        ['.trans', 'transition', theme('transitions')],
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
      const transforms = theme('transforms');
      Object.keys(transforms).forEach((variation) => {
        utilitiesExport[`.${variation}`] = {
          transform: transforms[variation],
        };
      });

      addUtilities(utilitiesExport, {
        variants: ['responsive', 'hover', 'focus', 'hocus'],
      });

      // Components
      addComponents(firestudioUi(theme));
    },
  ],
};
