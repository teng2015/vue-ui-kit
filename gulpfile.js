'use strict';

var autoprefixer = require('gulp-autoprefixer'),
    browserify = require('gulp-browserify'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    gulp = require('gulp'),
    inject = require('gulp-inject'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');



/* ===============================================
=============== For Development ==================
================================================*/

// inject app/dist/stylesheets/app.css and app/dist/javascripts/bundle.js into app/source/index.html
// and save as app/dist/index.html
gulp.task('inject', function () {
    var target = gulp.src('app/source/index.html');
    var sources = gulp.src([
        'app/dist/stylesheets/app.css',
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

// copy fonts from node_modules and app/source/fonts to app/dist/fonts
gulp.task('publish-fonts', function () {
    var fonts = [
        'node_modules/font-awesome/fonts/*',
        'app/source/fonts/*'
    ];

    return gulp.src(fonts)
        .pipe(gulp.dest('app/dist/fonts'));
});


// copy images from app/source/images to app/dist/images
gulp.task('publish-images', function () {
    return gulp.src('app/source/images/*')
        .pipe(gulp.dest('app/dist/images'));
});

// copy stylesheets files from node_modules to app/source/sass/vendors and convert to .scss file.
gulp.task('get-css', function () {
    var stylesheets = [
        'node_modules/normalize.css/normalize.css',
        'node_modules/font-awesome/css/font-awesome.css'
    ];

    return gulp.src(stylesheets)
        .pipe(rename({
            prefix: '_',
            extname: '.scss'
        }))
        .pipe(gulp.dest('app/source/sass/vendors'));
});

// copy libs from other_libs to app/dist/lib
gulp.task('publish-other-libs', function () {
    return gulp.src('other_libs/**/*')
        .pipe(gulp.dest('app/dist/libs'));
});

// compile sass(app/sass) into app/dist/stylesheets/app.css
gulp.task('compile-sass', function () {
    return gulp.src('app/source/sass/main.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('app/dist/stylesheets'))
        .pipe(browserSync.stream());
});

// use browserify to bundle CommonJS modules into app/dist/javascript/bundle.js
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
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('app/dist/javascripts'));
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
    gulp.watch('app/source/fonts/**', ['publish-fonts']);
    gulp.watch('app/source/images/**', ['publish-images']);

    gulp.watch('app/dist/index.html').on('change', browserSync.reload);
    gulp.watch('app/dist/javascripts/*').on('change', browserSync.reload);
    gulp.watch('app/dist/fonts/*').on('change', browserSync.reload);
    gulp.watch('app/dist/images/*').on('change', browserSync.reload);
});

// delete files under app/dist
gulp.task('clean-dist', function(cb) {
    return del([
        'app/dist/**/*'
    ], cb);
});

// development workflow task
gulp.task('dev', function (cb) {
    runSequence(['clean-dist', 'get-css'], ['publish-fonts', 'publish-images', 'publish-other-libs', 'compile-sass', 'browserify'], 'inject', 'watch', cb);
});

// default task
gulp.task('default', ['dev']);


/* ===============================================
================ For Production ==================
================================================*/

// minify app/dist/stylesheets/app.css and save as app/dist/stylesheets/app.min.css
gulp.task('minify-css', function () {
    return gulp.src('app/dist/stylesheets/app.css')
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

// inject app/dist/stylesheets/app.min.css and app/dist/javascripts/bundle.min.js into app/source/index.html
// and save as app/dist/index.html
gulp.task('inject-min', function () {
    var target = gulp.src('app/source/index.html');
    var sources = gulp.src([
        'app/dist/stylesheets/app.min.css',
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

// delete app/dist/stylesheets/app.css and app/dist/javascripts/bundle.js
gulp.task('del-bundle', function (cb) {
    return del([
        'app/dist/stylesheedts/app.css',
        'app/dist/javascripts/bundle.js'
    ], cb);
});

// run 'minify-css' and 'uglify-js' at the same time
gulp.task('prod',  function (cb) {
    runSequence(['minify-css', 'uglify-js'], ['inject-min', 'del-bundle'], cb);
});
