// Karma configuration
// Generated on Sat Oct 14 2017 21:53:19 GMT+0300 (Финляндия (лето))

const process = require('process');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/lodash/lodash.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/sinon/pkg/sinon.js',
      'src/**/*.js',
      // 'test/**/*_spec.js'
      // 'test/**/scope_spec.js'
      // 'test/**/loader_spec.js',
      // 'test/**/injector_spec.js',
      // 'test/**/angular_public_spec.js',
      // 'test/**/q_spec.js'
      // 'test/**/http_spec.js'
      // 'test/**/filter_spec.js'
      // 'test/**/filter_filter_spec.js'
      'test/**/compile_spec.js'
      // 'test/**/controller_spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['jshint', 'coverage'],
      'test/**/*_spec.js': ['jshint']
    },

    // add plugin settings
    coverageReporter: {
      // type of file to output, use text to output to console
      // type : 'text',
      type : 'html',
      // directory where coverage results are saved
      dir: 'test/coverage/'
      // if type is text or text-summary, you can set the file name
      // file: 'coverage.txt'
    },

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jshint-preprocessor',
      'karma-coverage'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS'
    ],
    // browsers: ['HeadlessChrome'],
    // customLaunchers:{
    //     HeadlessChrome:{
    //         base: 'ChromeHeadless',
    //         flags: ['--no-sandbox']
    //     }
    // },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
