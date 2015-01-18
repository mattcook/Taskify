"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var watchify   = require('watchify');
var browserify = require('browserify');
var ngAnnotate = require('browserify-ngannotate');
var notify     = require('gulp-notify');
var source     = require('vinyl-source-stream');
var browserSync  = require('browser-sync');

var paths = {
  sass: ['./scss/**/*.scss']
};

var handleErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
}

function buildScript(file) {
  var bundler = browserify({
    entries: [
      './www/js/app.js',
      './www/js/controllers.js',
      './www/lib/ionic-contrib-tinder-cards/ionic.tdcards.js'
    ],
    cache: {},
    packageCache: {},
    fullPaths: true
  }, watchify.args);

  bundler = watchify(bundler);
  bundler.on('update', function() {
    rebundle();
  });

  bundler.transform(ngAnnotate);

  function rebundle() {
    var stream = bundler.bundle();

    gutil.log('Rebundle...');

    return stream.on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./www/js'))
      .pipe(browserSync.reload({ stream: true, once: true }))
      .pipe(notify("Compiled bundle... reloading"));
  }
  return rebundle();
}

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('browserify', function() {
  return buildScript('main.js');
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
