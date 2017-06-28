var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');

var dependencies = ['react', 'react-dom'];

gulp.task('scripts', function() {
  bundleApp(false);
});

gulp.task('watch', function() {
  gulp.watch(['./src/*.js'], ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);

function bundleApp(isProduction) {
  browserify({require: dependencies, debug: true})
    .bundle()
    .on('error', gutil.log)
    .pipe(source('vendors.js'))
    .pipe(gulp.dest('./public/js/'));
  //
  var appBundler = browserify({entries: './src/app.js', debug: true})
  // dependencies.forEach(function(dep) {
  //   appBundler.external(dep);
  // })
  appBundler.transform(babelify, { presets: ["react", "es2015"] })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/js/'));
}
