const { withSPA } = require('next-spa');
const path = require('path');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const firebaseConfig = require('./firebase.config');

const nextConfig = withSass(withCSS(withSPA({
  distDir: './dist/build',
  publicRuntimeConfig: {
    FIREBASE: firebaseConfig,
  },
  nextSPA: {
    fallback: '200.html',
  },
  firestudio: {
    projectId: firebaseConfig.projectId,
    // cloudRenderAllDynamicRoutes: true,
  },
  webpack(config) {
    config.resolve.alias = { // eslint-disable-line no-param-reassign
      ...config.resolve.alias || {},
      '@atoms': path.resolve(__dirname, './src/app/components/atoms'),
      '@elements': path.resolve(__dirname, './src/app/components/elements'),
      '@layouts': path.resolve(__dirname, './src/app/components/layouts'),
      '@hocs': path.resolve(__dirname, './src/app/components/hocs'),
      '@config': path.resolve(__dirname, './src/app/config'),
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
})));

module.exports = nextConfig;
