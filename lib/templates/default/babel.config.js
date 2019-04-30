module.exports = {
  presets: [
    'next/babel',
  ],
  plugins: [
    ['@babel/transform-runtime', { regenerator: true }],
    ['inline-import', { extensions: ['.css', '.scss'] }],
  ],
  env: {
    production: {
      presets: [
        ['@babel/env', { targets: { node: '6' } }],
      ],
    },
    development: {
      presets: [
        ['@babel/env', { targets: { node: '6' } }],
      ],
    },
  },
};
