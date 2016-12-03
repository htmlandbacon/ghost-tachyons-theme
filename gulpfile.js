'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean')

var moduleImporter = require('sass-module-importer');
var pump = require('pump');
var runSequence = require('run-sequence');

const baseAssets = './assets/'


gulp.task('default', function (done) {
  runSequence('clean',
                ['copy',
                 'sass',
                 'sass:watch'], done)
})

gulp.task('production', function (done) {
  runSequence('clean',
                ['compress',
                'sass:production'], done)
})

gulp.task('clean', function (done) {
  return gulp.src([baseAssets + '/**'], {read: false})
  .pipe(clean(done))
})


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


gulp.task('compress', function (done) {
  pump([
        gulp.src(['./node_modules/prismjs/prism.js']),
        uglify(),
        gulp.dest(baseAssets + 'js')
    ],
    done
  );
});
