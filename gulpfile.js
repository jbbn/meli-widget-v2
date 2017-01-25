var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var clean = require('gulp-clean');
var ghPages = require('gulp-gh-pages');

// Styles
gulp.task('styles', function () {
    var sassPath = 'src/styles/main.scss';
    return sass(sassPath, {
            style: 'expanded'
        })
        .pipe(autoprefixer('last 1 version'))
        .pipe(gulp.dest('src/styles'));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src('src/scripts/**/*.js');
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'));
});

// HTML
gulp.task('html', ['styles', 'scripts'], function () {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', csso()))
        .pipe(gulp.dest('dist'));
});

// Copy
gulp.task('copy', function () {
    return gulp.src('src/bower_components/chico/dist/assets/**/*')
        .pipe(gulp.dest('dist/assets'));
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist/*.css', 'dist/*.js'], {
        read: false
    }).pipe(clean());
});

// Build
gulp.task('build', ['html']);

// Default - clean and build
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Watch
gulp.task('watch', function () {

    // Watch .scss files
    gulp.watch('src/styles/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts']);
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({
      remoteUrl: 'git@github.com:jbbn/meli-widget-v2.git'
  }));
});