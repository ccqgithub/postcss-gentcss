var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssnext = require("postcss-cssnext")
var postcssGent = require('./index');

// gulp.task('lint', function() {
//   var eslint = require('gulp-eslint');
//   return gulp
//     .src(['index.js', 'test/*.js', 'gulpfile.js'])
//     .pipe(eslint())
//     .pipe(eslint.format())
//     .pipe(eslint.failAfterError());
// });

gulp.task('test', function() {
  var mocha = require('gulp-mocha');
  return gulp
    .src('test/*.js', {read: false})
    .pipe(mocha());
});

gulp.task('build', function() {
  var plugins = [
    postcssGent(),
    cssnext(),
  ];

  return gulp.src('./css/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist'));
});
