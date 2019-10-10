const gulp = require('gulp'),
    path = require('path'),
    pug = require('gulp-pug'),
    less = require('gulp-less')
    browserSync = require('browser-sync');
    image = require('gulp-image');
    minify = require('gulp-minify');

const SITE_DIR = '_site',
    LESS_DIR = 'less',
    CSS_DIR = '_site/css';
    IMG_DIR = '_site/images'
    JS_DIR = '_site/js'

/**
 * pug compiler
 */
gulp.task('pug', function(){
    gulp.src('*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(SITE_DIR))
        .pipe(browserSync.reload({stream: true}))
})

/**
 * JS minifier
 */
gulp.task('pack-js', function() {
    gulp.src(['./js/*.js'])
      .pipe(minify({
        ignoreFiles: ['-min.js']

      }))
      .pipe(gulp.dest(JS_DIR))
  });

  /**
 * less compiler
 */

gulp.task('less', function(){
    return gulp.src(LESS_DIR + '/*.less')
        .pipe(less({
            includePaths: LESS_DIR,
        }))
        .pipe(gulp.dest(CSS_DIR))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('image', function () {
    gulp.src('./images/*')
      .pipe(image())
      .pipe(gulp.dest(IMG_DIR))
});

gulp.task('browser-sync', ['less', 'pug'],function(){
    browserSync({
        server: {baseDir: SITE_DIR},
        notify: true,
        port: 9999
    })
})

gulp.task('watch', function(){
    gulp.watch(LESS_DIR + '/**', ['less'])
    gulp.watch(['*pug', '**/*.pug'], ['pug'])
    gulp.watch(['*js', '**/*.js'], ['pack-js'])
})

gulp.task('default', ['browser-sync', 'watch', 'image'])