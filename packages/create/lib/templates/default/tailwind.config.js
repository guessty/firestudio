// See https://tailwindcss.com
/* eslint-disable quote-props */

const firepressUi = require('@firepress/ui/dist/tailwindcss-components');

module.exports = {
  theme: {
    screens: {
      'xs': '425px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      'max-xs': { max: '424px' },
      'max-sm': { max: '639px' },
      'max-md': { max: '767px' },
      'max-lg': { max: '1023px' },
      'max-xl': { max: '1279px' },
      'max-2xl': { max: '1439px' },
    },

    extend: {
      colors: {
        'gray-950': '#141414',
        'gray-900': '#252525',
      },

      height: {
        'screen-100': '100vh',
        'screen-80': '80vh',
        'screen-85': '85vh',
      },

      inset: {
        '1/2': '50%',
        '-1/2': '-50%',
      },

      minHeight: {
        '144': '34rem',
      },

      opacity: {
        '95': '.95',
      },

      scale: {
        '-100': '-1',
      },

      spacing: {
        '9': '2.25rem',
        '26': '6.5rem',
        '28': '7rem',
        '36': '9rem',
        '72': '18rem',
        '84': '20rem',
        '96': '22rem',
        '104': '24rem',
        '112': '26rem',
        '120': '28rem',
        '128': '30rem',
        '136': '32rem',
        '144': '34rem',
        '152': '36rem',
        '160': '39rem',
        '168': '40rem',
        '176': '44rem',
        '184': '46rem',
        '192': '48rem',
        '200': '50rem',
        '208': '52rem',
      },

      zIndex: {
        '1': 1,
      },
    },
  },

  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'hocus'],
    borderColor: ['hocus'],
    display: ['responsive', 'hover', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'hocus', 'group-hover'],
    scale: ['responsive', 'hover', 'focus', 'hocus'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },

  plugins: [
    require('tailwindcss-interaction-variants')(), // eslint-disable-line import/no-extraneous-dependencies, global-require
    ({ addUtilities, addComponents, theme }) => {
      const utilitiesExport = {};

      addUtilities(utilitiesExport, {
        variants: ['responsive', 'hover', 'focus', 'hocus'],
      });

      // Components
      addComponents(firepressUi(theme));
    },
  ],
};
