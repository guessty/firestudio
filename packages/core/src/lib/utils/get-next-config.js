const findUp = require('find-up');

module.exports = function(dir) {
  const nextConfigSource = findUp.sync('next.config.js', {
    cwd: dir,
  });

  console.log(nextConfigSource);

  let nextConfig = {};

  if (nextConfigSource && nextConfigSource.length) {
    try {
      nextConfig = require(nextConfigSource);
    } catch (err) {
      console.log('Using default next.js config');
    }
  }

  return nextConfig;
};
