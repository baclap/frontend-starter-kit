var config = require('./config');

var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var watch = require('gulp-watch');

var cleancss = new LessPluginCleanCSS({ advanced: true });
var autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

gulp.task('default', ['dev-css', 'dev-js']);
gulp.task('build', ['prod-css', 'prod-js']);

gulp.task('dev-css', function(){
    watch(config.LESS_GLOB, function() {
        gutil.log('Recompiling LESS')
        return compileLess(false);
    });
    return compileLess(false);
});

gulp.task('prod-css', function(){
    return compileLess(true);
});

gulp.task('dev-js', function() {
    var b = getBrowserifyInstance(false);
    var w = watchify(b);

    w.transform('babelify', { presets: ['es2015'] });
    w.on('update', function() {
        gutil.log('Updating JS bundle');
        bundleBrowserify(w);
    });
    bundleBrowserify(w, false);
});

gulp.task('prod-js', function() {
    var b = getBrowserifyInstance(true);
    b.transform('babelify', { presets: ['es2015'] });
    return bundleBrowserify(b, true);
});

var compileLess = function(forProduction) {
    var plugins = [autoprefix];
    if (forProduction) {
        plugins.push(cleancss);
    }
    return gulp.src([config.LESS_ROOT])
    .pipe(!forProduction ? sourcemaps.init() : gutil.noop())
    .pipe(less({ plugins: plugins }))
    .pipe(!forProduction ? sourcemaps.write() : gutil.noop())
    .pipe(forProduction ? gulp.dest(config.BUILD_DIR) : gulp.dest(config.DEV_PUBLIC_DIR))
    .pipe(notify('LESS compiled'));
}

var getBrowserifyInstance = function(forProduction) {
    return browserify(config.JS_ROOT, {
        debug: !forProduction,

        // watchify args
        cache: {},
        packageCache: {}
    });
}

var bundleBrowserify = function(browserifyInstance, forProduction) {
    return browserifyInstance.bundle(function(err){
        if(err){
            console.error(err.message);
        }
    })
    .pipe(source(config.JS_BUNDLE_NAME))
    .pipe(buffer())
    .pipe(forProduction ? uglify() : gutil.noop())
    .pipe(forProduction ? gulp.dest(config.BUILD_DIR) : gulp.dest(config.DEV_PUBLIC_DIR))
    .pipe(notify('JS bundling complete'));
};
