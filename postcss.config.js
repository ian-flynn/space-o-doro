const postcssPresetEnv = require('postcss-preset-env');
const cssNano = require('cssnano');
module.exports = {
  plugins: [postcssPresetEnv({ stage: 1 })],
};
