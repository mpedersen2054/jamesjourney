var gulp   = require('gulp');
var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var sass   = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');


var sourceFiles = {
  js: ['./src/js/**/*.js', './src/js/*.js'],
  css: ['./src/css/**/*.css', './src/css/*.css']
};


gulp.task('default', ['watch']);


gulp.task('js', function() {
  return gulp.src(sourceFiles.js)
    .pipe(sourceMaps.init())
    .pipe(concat('app.bundle.js'))
    .pipe(sourceMaps.write())
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

gulp.task('watch', function() {
  gulp.watch(sourceFiles.js, ['js'])
  gulp.watch(sourceFiles.css, ['css'])
});