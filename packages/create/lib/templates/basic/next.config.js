const withFirestudio = require('@firestudio/core/config');
const path = require('path');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');

let firebaseConfig;
try {
  firebaseConfig = require('./config/firebase.config');
} catch {
  firebaseConfig = {};
}

const nextConfig = withSass(withCSS(withFirestudio({
  distDir: './dist/build',
  env: {
    FIREBASE: firebaseConfig,
  },
  firestudio: {
    fallback: '200.html',
    projectId: firebaseConfig.projectId,
  },
  webpack(config) {
    config.resolve.alias = { // eslint-disable-line no-param-reassign
      ...config.resolve.alias || {},
      '@elements': path.resolve(__dirname, './src/app/components/elements'),
      '@partials': path.resolve(__dirname, './src/app/components/partials'),
      '@templates': path.resolve(__dirname, './src/app/components/templates'),
      '@hocs': path.resolve(__dirname, './src/app/hocs'),
      '@config': path.resolve(__dirname, './src/app/config'),
      '@plugins': path.resolve(__dirname, './src/app/plugins'),
      '@store': path.resolve(__dirname, './src/app/store'),
    };

    config.module.rules.push(
      {
        test: /\.(eot|woff|woff2|ttf|svg|bmp|png|jpe?g|gif)$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    );

    return config;
  },
  sassLoaderOptions: {
    includePaths: ['node_modules'],
  },
})));

module.exports = nextConfig;
