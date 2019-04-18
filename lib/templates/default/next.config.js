const { withSPA } = require('next-spa');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');

const nextConfig = withSass(withCSS(withSPA({
  distDir: './dist/build',
  nextSPA: {
    fallback: '200.html',
  },
  nextFire: {
    projectId: '<insert project id>',
    // cloudRenderAllDynamicRoutes: true,
  },
  webpack(config) {
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
