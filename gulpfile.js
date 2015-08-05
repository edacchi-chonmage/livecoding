var gulp = require('gulp');
var rseq = require('run-sequence');
var ts = require('gulp-typescript');
var htmlcomb = require('gulp-htmlcomb');
var sass = require('gulp-sass');
var csscomb = require('gulp-csscomb');
var pleeease = require('gulp-pleeease');
var webserver = require('browser-sync');
var watch = require('gulp-watch');

gulp.task('default', [
  'build',
  'watch',
  'webserver'
]);

gulp.task('build', [
  'html:build',
  'ts:build',
  'sass:build',
  'bower'
]);

gulp.task('watch', [
  'html:watch',
  'ts:watch',
  'sass:watch'
]);

gulp.task('webserver', function () {
  webserver({
    server: {
      baseDir: 'dist/',
      index: 'layout/common.html'
    }
  });
});

gulp.task('webserver:reload', function () {
  webserver.reload();
});

gulp.task('html:build', function () {
  gulp.src(['src/views/**/*.html'])
    .pipe(gulp.dest('dist/'))
  ;
});

gulp.task('html:watch', function () {
  watch(['src/views/**/*.html'], function () {
    gulp.start('html:build');
  });
  watch(['dist/**/*.html'], function () {
    gulp.start('webserver:reload');
  });
});

gulp.task('ts:build', function () {
  gulp.src(['src/scripts/**/*.ts'])
    .pipe(ts({
      noEmitOnError: true
    }))
    .pipe(gulp.dest('dist/scripts/'))
  ;
});

gulp.task('ts:watch', function () {
  watch(['src/scripts/**/*.ts'], function () {
    gulp.start('ts:build');
  });
  watch(['dist/**/*.js'], function () {
    gulp.start('webserver:reload');
  });
});

gulp.task('sass:build', function () {
  gulp.src(['src/styles/*.scss'])
    .pipe(sass())
    .on('error', function (e) {
      console.log(e.message);
    })
    .pipe(csscomb())
    .pipe(pleeease({
      autoprefixer: {
        browsers: [
          'ie >= 8'
        ]
      },
      minifier: false
    }))
    .pipe(gulp.dest('dist/styles/'))
  ;
});

gulp.task('sass:watch', function () {
  watch(['src/styles/**/*.scss'], function () {
    gulp.start('sass:build');
  });
  watch(['dist/**/*.css'], function () {
    gulp.start('webserver:reload');
  });
});

gulp.task('bower', function () {
  gulp.src([
      'bower_components/angular/angular.min.*',
      'bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'bower_components/angular-animate/angular-animate.min.*',
      'bower_components/jquery/dist/jquery.min.*',
      'bower_components/lodash/lodash.min.js'
    ])
    .pipe(gulp.dest('dist/scripts/vendor/'))
  ;
});
