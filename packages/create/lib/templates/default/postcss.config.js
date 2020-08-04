module.exports = {
  plugins: [
    'tailwindcss',
    'autoprefixer',
    ...process.env.NODE_ENV === 'production'
      ? [['@fullhuman/postcss-purgecss', {
        content: [
          './src/app/**/*.{js,jsx,ts,tsx}',
        ],
        whitelistPatternsChildren: [],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      }]]
      : [],
  ],
};
