'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var moduleImporter = require('sass-module-importer');

/* sass things */
const baseAssets = './assets/'

gulp.task('default', ['copy', 'sass:watch']);

gulp.task('production', ['copy', 'sass:production']);

gulp.task('sass', function () {
  return gulp.src('./dev/sass/*.scss')
    .pipe(sass({ importer: moduleImporter() }).on('error', sass.logError))
    .pipe(gulp.dest(baseAssets + 'css'));
});

gulp.task('sass:production', function () {
  return gulp.src('./dev/sass/*.scss')
    .pipe(sass({ importer: moduleImporter() }).on('error', sass.logError))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(baseAssets + 'css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./dev/sass/*.scss', ['sass']);
});

gulp.task('copy', function() {
    gulp.src(['./node_modules/prismjs/prism.js'])
        .pipe(gulp.dest(baseAssets + 'js'));
});
