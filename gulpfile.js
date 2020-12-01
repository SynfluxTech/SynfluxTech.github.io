let gulp = require('gulp');
let plumber = require('gulp-plumber');
let notify = require('gulp-notify');
let sass = require('gulp-sass');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let cssdeclsort = require('css-declaration-sorter');
let mqpacker = require('css-mqpacker');
let sourcemaps = require("gulp-sourcemaps");
let browserSync = require('browser-sync').create();

gulp.task('sass', () => {
  return gulp.src(['./scss/**/*.scss', '!scss/**/_*.scss'])
    .pipe(plumber({errorHandler: notify.onError(
      "Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass({outputstyle: 'expanded'}))
    .pipe(postcss([autoprefixer()]))
    .pipe(postcss([mqpacker()]))
    .pipe(postcss([cssdeclsort( {order: 'smacss' } )]))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {

  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch('./scss/**/*.scss', gulp.task('sass'));
  gulp.watch('./slim/**/*.slim',gulp.task('slim'));
  gulp.watch("./css/**/*.css").on("change",browserSync.reload);
  gulp.watch("./**/*.html").on("change",browserSync.reload);
});