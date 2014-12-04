var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var nib = require('nib');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var plumber = require('gulp-plumber');

gulp.task('stylus', function() {
  gulp
    .src('./public/styles/styles.styl')
    .pipe(plumber())
    .pipe(stylus({
      compress: true,
      use: nib(),
      sourcemap: {
        inline: true,
        sourceRoot: '.',
        basePath: 'public/build',
      }
    }))
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: '.'
    }))
    .pipe(gulp.dest('./public/build'));
});

gulp.task('less', function() {
  gulp
    .src('./public/styles/bootstrap.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/build'))
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./public/styles/*.styl', ['stylus']).on('change', livereload.changed);
  gulp.watch('./public/styles/bootstrap.less', ['less']).on('change', livereload.changed);
  gulp.watch('./views/*').on('change', livereload.changed);
});

gulp.task('default', ['stylus', 'less']);

