'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var moduleImporter = require('sass-module-importer');

/* sass things */

gulp.task('sass', function () {
  return gulp.src('.dev/sass/*.scss')
    .pipe(sass({ importer: moduleImporter() }).on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:production', function () {
  return gulp.src('./dev/sass/*.scss')
    .pipe(sass({ importer: moduleImporter() }).on('error', sass.logError))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('.dev/sass/*.scss', ['sass']);
});
