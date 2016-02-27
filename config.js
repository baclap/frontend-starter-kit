'use strict';

// all paths should be relative to root directory of the project
module.exports = {
  // The directory your development server will serve static assets from. Your
  // static HTML files should be placed in here. The compile process will place
  // your compiled JS and LESS here.
  DEV_PUBLIC_DIR: './dev-public',
  // The entry file from which Browserify will bundle your JS code.
  JS_ROOT: './src/js/main.js',
  // The filename where the bundled JS will be put.
  JS_BUNDLE_NAME: 'bundle.js',
  // The entry file from which the LESS compiler will compile your stylesheets.
  LESS_ROOT: './src/less/main.less',
  // The glob of LESS files for the compiler to watch. See:
  // http://gruntjs.com/configuring-tasks#globbing-patterns
  LESS_GLOB: './src/less/**/*.less',
  // Running `gulp build` will place your compiled and minified JS/LESS into
  // this directory. The filename for your compiled LESS will be the same as the
  // root file (the extension will be .css).
  BUILD_DIR: './dist',
}
