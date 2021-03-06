'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

global.DEV_ENV = process.env.DEV_ENV;

const path = require('path');

// 开发代理后端服务配置
const serverConfig = {
  // 后端服务协议
  serverProtocol: 'http://',
  // 后端服务地址
  serverHost: 'localhost',
  // 后端服务端口
  serverPort: 9010,
  // 后端服务路径
  serverPath: '/api/'
};

// mock服务端口
const mockPort = 8989;

const proxyTargetHost = function() {
  // 使用mock服务
  if (global.DEV_ENV === 'mock') {
    return 'http://localhost:' + mockPort;
  }

  return serverConfig.serverProtocol + serverConfig.serverHost + (serverConfig.serverPort === 80 ? '' : ':' + serverConfig.serverPort);
};

module.exports = {
  dev: {
    // mock服务端口
    mockPort,
    // mock数据文件
    mockFileDir: path.resolve(__dirname, '../mock'),
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      [serverConfig.serverPath + '**/*']: {
        target: proxyTargetHost(),
        changeOrigin: true
      }
      // '/api': {
      //     // 测试环境
      //     target: 'http://www.baidu.com/', // 接口域名
      //     changeOrigin: true, //是否跨域
      //     pathRewrite: {
      //         '^/api': '' //需要rewrite重写的,
      //     }
      // }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 3001, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
