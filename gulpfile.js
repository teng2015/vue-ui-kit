'use strict';

var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var inject = require('gulp-inject');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');



/* ===============================================
=============== For Development ==================
================================================*/

// inject app/dist/stylesheets/bundle.css and app/dist/javascripts/bundle.js into app/source/index.html
// and save as app/dist/index.html
gulp.task('inject', function () {
    var target = gulp.src('app/source/index.html');
    var sources = gulp.src([
        'app/dist/stylesheets/bundle.css',
        'app/dist/javascripts/bundle.js'
    ], {
        read: false
    });
    return target
        .pipe(inject(sources, {
            ignorePath: 'app/dist/',
            addRootSlash: false,
            removeTags: true
        }))
        .pipe(gulp.dest('app/dist'));
});

// copy fonts from bower_components and app/source/fonts to app/dist/fonts
gulp.task('publish-fonts', function () {
    var fonts = [
        'bower_components/font-awesome/fonts/*',
        'app/source/fonts/*'
    ];

    return gulp.src(fonts)
        .pipe(gulp.dest('app/dist/fonts'));
});


// optimize images under app/source/images and save the results to app/dist/images
gulp.task('publish-images', function () {
    return gulp.src('app/source/images/*')
        .pipe(gulp.dest('app/dist/images'));
});

// concat all stylesheets below and save as app/dist/stylesheets/bundle.css
gulp.task('publish-css', function () {
    var stylesheets = [
        'bower_components/normalize-css/normalize.css',
        'bower_components/font-awesome/css/font-awesome.css',
        'bower_components/remodal/dist/remodal.css',

        '.tmp/stylesheets/bundle.tmp.css'
    ];
    return gulp.src(stylesheets)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('app/dist/stylesheets'))
        .pipe(browserSync.stream());
});

// concat all javascripts below and save as app/dist/javascripts/bundle.js
gulp.task('publish-js', function () {
    var javascripts = [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/moment/moment.js',
        'bower_components/underscore.js',
        'bower_components/remodal/dist/remodal.js',
        'bower_components/vue/dist/vue.js',
        'bower_components/vue-router/dist/vue-router.js',

        '.tmp/javascripts/bundle.tmp.js'
    ];
    return gulp.src(javascripts)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('app/dist/javascripts'));
});

// compile sass(app/sass) into .tmp/stylesheets/app.tmp.css
gulp.task('compile-sass', function () {
    return gulp.src('app/source/sass/main.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename('bundle.tmp.css'))
        .pipe(gulp.dest('.tmp/stylesheets'));
});

// use browserify to bundle CommonJS modules into .tmp/javascript/bundle.tmp.js
gulp.task('browserify', function () {
    return gulp.src('app/source/javascripts/main.js')
        .pipe(browserify({
            transform: ['partialify'],
            debug: true
        }))
        .on('error', function (err) {
            console.log(err.message);
            this.end();
        })
        .pipe(rename('bundle.tmp.js'))
        .pipe(gulp.dest('.tmp/javascripts'));
});

// watch files and run corresponding task(s) once files are added, removed or edited.
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: 'app/dist'
        }
    });

    gulp.watch('app/source/index.html', ['inject']);
    gulp.watch('app/source/sass/**/*.scss', ['compile-sass']);
    gulp.watch('app/source/javascripts/**/*', ['browserify']);
    gulp.watch('app/source/fonts/**/*', ['publish-fonts']);
    gulp.watch('app/source/images/**/*', ['publish-images']);
    gulp.watch('.tmp/stylesheets/**/*', ['publish-css']);
    gulp.watch('.tmp/javascripts/**/*', ['publish-js']);

    gulp.watch('app/dist/index.html').on('change', browserSync.reload);
    gulp.watch('app/dist/javascripts/*').on('change', browserSync.reload);
    gulp.watch('app/dist/fonts/*').on('change', browserSync.reload);
    gulp.watch('app/dist/images/*').on('change', browserSync.reload);
});

// delete files under app/dist
gulp.task('clean', function(cb) {
    return del([
        '.tmp',
        'app/dist/**/*'
    ], cb);
});

// development workflow task
gulp.task('dev', function (cb) {
    runSequence(['clean'], ['compile-sass', 'browserify'], ['publish-fonts', 'publish-images', 'publish-css', 'publish-js'], 'inject', 'watch', cb);
});

// default task
gulp.task('default', ['dev']);


/* ===============================================
================ For Production ==================
================================================*/

// minify app/dist/stylesheets/bundle.css and save as app/dist/stylesheets/bundle.min.css
gulp.task('minify-css', function () {
    return gulp.src('app/dist/stylesheets/bundle.css')
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/dist/stylesheets'));
});

// uglify app/dist/javascripts/bundle.js and save as app/dist/javascripts/bundle.min.js
gulp.task('uglify-js', function () {
    return gulp.src('app/dist/javascripts/bundle.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/dist/javascripts'));
});

// inject app/dist/stylesheets/bundle.min.css and app/dist/javascripts/bundle.min.js into app/source/index.html
// and save as app/dist/index.html
gulp.task('inject-min', function () {
    var target = gulp.src('app/source/index.html');
    var sources = gulp.src([
        'app/dist/stylesheets/bundle.min.css',
        'app/dist/javascripts/bundle.min.js'
    ], {
        read: false
    });
    return target
        .pipe(inject(sources, {
            ignorePath: 'app/dist/',
            addRootSlash: false,
            removeTags: true
        }))
        .pipe(gulp.dest('app/dist'));
});

// delete app/dist/stylesheets/bundle.css and app/dist/javascripts/bundle.js
gulp.task('del-bundle', function (cb) {
    return del([
        'app/dist/stylesheedts/bundle.css',
        'app/dist/javascripts/bundle.js'
    ], cb);
});

// run 'minify-css' and 'uglify-js' at the same time
gulp.task('prod',  function (cb) {
    runSequence(['minify-css', 'uglify-js'], ['inject-min', 'del-bundle'], cb);
});
