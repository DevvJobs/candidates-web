'use strict';
const path = require('path');
const config = require('../config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const packageConfig = require('../package.json');

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path)
};

const buildcssLoaders = function (options) {
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      ident: "css",
      sourceMap: options.sourceMap
    }
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap: options.sourceMap,
      plugins: (loader) => [
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
        require('postcss-preset-env')()
      ]
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders =
      options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    if (options.extract) {
      return [MiniCssExtractPlugin.loader].concat(loaders)
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
  return {
    css: generateLoaders(),
    postcss: generateLoaders()
  }
};

exports.styleLoaders = (options) => {
  const output = [];
  const loaders = buildcssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
};

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier');

  return (severity, errors) => {
    if (severity !== 'error') return;

    const error = errors[0];
    const filename = error.file && error.file.split('!').pop();

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
};
