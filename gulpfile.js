var gulp       = require('gulp');
var concat     = require('gulp-concat');
var sourceMaps = require('gulp-sourcemaps');
var minifyCss  = require('gulp-minify-css');
var browserify = require('browserify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var gutil      = require('gulp-util');

var sourceFiles = {
  js: ['./src/js/**/*.js', './src/js/*.js'],
  css: ['./src/css/**/*.css', './src/css/*.css']
};

gulp.task('default', ['watch']);

gulp.task('es6', function() {
  browserify({
      entries: './src/js/main.js',
      debug: true
    })
    .transform(babelify)
    .on('error',gutil.log)
    .bundle()
    .on('error',gutil.log)
    .pipe(source('app.bundle.js'))
    .pipe(gulp.dest('./public/js'))
});

gulp.task('css', function() {
  return gulp.src(sourceFiles.css)
    .pipe(sourceMaps.init())
    .pipe(minifyCss())
    .pipe(concat('app.bundle.css'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./public/css'))
});

gulp.task('watch',function() {
  gulp.watch('./src/js/*.js',['es6'])
  gulp.watch(sourceFiles.css, ['css'])
});

gulp.task('default', ['watch']);