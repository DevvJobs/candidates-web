'use strict';
const utils = require('./utils');
const config = require('../config');
const isProduction = process.env.NODE_ENV === 'production';
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap;

module.exports = {
  postcss: [
    require('postcss-import'),
    require("postcss-custom-media")({ extensions: {
      '--phone-viewport': '(max-width: 30em)', // 480
      '--phoneLarge-viewport': '(max-width: 36em)', // 576
      '--tablet-viewport': '(max-width: 48em)', // 768
      '--desktopSmall-viewport': '(max-width: 53em)', // 848
      '--desktop-viewport': '(max-width: 60em)', // 960
      '--desktopLarge-viewport': '(max-width: 77em)' // 1232
    }}),
    require('postcss-nested'),
    require('postcss-cssnext')
  ],
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
};
