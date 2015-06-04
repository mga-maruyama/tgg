var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    ssi = require('browsersync-ssi'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    prettify = require('gulp-prettify'),
    cssbeautify = require('gulp-cssbeautify'),
    jsprettify = require('gulp-jsbeautifier'),
    imagemin = require('gulp-imagemin'),
    changed = require('gulp-changed'),
    del = require('del');

var paths = {
  base:  './htdocs',
  html:  './htdocs/**/*.html',
  css:   './htdocs/**/*.css',
  js:    './htdocs/**/*.js',
  image: './htdocs/**/img/*',
  inc:   './htdocs/**/*.inc',
  dist:  './dist'
}

gulp.task('server', function(){
  browserSync({
    server: paths.base,
    // startPath: './hoge/',
    // port: 6116,
    open: 'external',
    xip: true,
    tunnel: true,
    middleware: [
      ssi({
        // baseDir: __dirname + "./base",
        baseDir: paths.base,
        ext: ".html"
      })
    ]
  });
});

gulp.task('b-server', function(){
  browserSync({
    server: paths.dist,
    open: 'external',
    xip: true,
    tunnel: true,
    middleware: [
      ssi({
        baseDir: paths.dist,
        ext: ".html"
      })
    ]
  });
});

gulp.task('html', function(){
  gulp
    .src(paths.html)
    .pipe(plumber())
    .pipe(changed(paths.dist))
    .pipe(prettify())
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function(){
  gulp
    .src(paths.css)
    .pipe(plumber())
    .pipe(changed(paths.dist))
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function(){
  gulp
    .src(paths.js)
    .pipe(plumber())
    .pipe(changed(paths.dist))
    .pipe(jsprettify())
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('image', function(){
  gulp
    .src(paths.image)
    .pipe(plumber())
    .pipe(changed(paths.dist))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('inc', function(){
  gulp
    .src(paths.inc)
    .pipe(plumber())
    .pipe(changed(paths.dist))
    .pipe(prettify())
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('clean', function(cb) {
  del(paths.dist, cb);
});

gulp.task('watch', function(){
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.image, ['image']);
  gulp.watch(paths.inc, ['inc']);
});

gulp.task('build', ['clean'], function(){
    gulp.start('create');
    // gulp.start('watch');
    // gulp.start('b-server');
});

gulp.task('create', ['html', 'css', 'js', 'image', 'inc']);
gulp.task('default', ['watch', 'server']);

