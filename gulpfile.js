'use strict';

var autoprefixer = require('gulp-autoprefixer'),
    browserify = require('gulp-browserify'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
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

// inject stylesheets(./app/dist/stylesheets) and javascripts(./app/dist/javascripts) into index.html
gulp.task('inject', function () {
    var target = gulp.src('./app/source/index.html');
    var sources = gulp.src([
        './app/dist/stylesheets/bundle.css',
        './app/dist/javascripts/bundle.js'
    ], {
        read: false
    });
    return target
        .pipe(inject(sources, {
            ignorePath: 'app/dist/',
            addRootSlash: false
        }))
        .pipe(gulp.dest('./app/dist'));
});

// copy fonts from node_modules to ./app/source/fonts for later use
gulp.task('get-fonts', function () {
    var fonts = [
        './node_modules/font-awesome/fonts/*'
    ];

    return gulp.src(fonts)
        .pipe(gulp.dest('./app/source/fonts'));
});


// copy fonts from ./app/source/fonts to ./app/dist/fonts for distribution
gulp.task('publish-fonts', function () {
    return gulp.src('./app/source/fonts/*')
        .pipe(gulp.dest('./app/dist/fonts'));
});

// copy images from ./app/source/images to ./app/dist/images
gulp.task('publish-images', function () {
    return gulp.src('./app/source/images/*')
        .pipe(gulp.dest('./app/dist/images'));
});

// copy stylesheets files from node_modules to ./app/source/stylesheets for later use
gulp.task('get-css', function () {
    var stylesheets = [
        './node_modules/normalize.css/normalize.css',
        './node_modules/font-awesome/font-awesome.css'
    ];

    return gulp.src(stylesheets)
        .pipe(gulp.dest('./app/source/stylesheets'));
})

// compile sass(./app/sass) into ./app/source/stylesheets/compiled-style.css
gulp.task('compile-sass', function () {
    return gulp.src('./app/source/sass/main.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(rename('compiled-style.css'))
        .pipe(gulp.dest('./app/source/stylesheets'));
});

// concatenate all stylesheets('./app/source/stylesheets/*') into one file('./app/dist/stylesheets/bundle.css');
gulp.task('concat-css', function () {
    var stylesheets = [
        './app/source/stylesheets/*'
    ];

    return gulp.src(stylesheets)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('./app/dist/stylesheets'))
        .pipe(browserSync.stream());
});

// use browserify to bundle javascript modules into ./app/dist/javascript/bundle.js
gulp.task('browserify', function () {
    return gulp.src('./app/source/javascripts/main.js')
        .pipe(browserify({
            transform: ['partialify'],
            debug: true
        }))
        .on('error', function (err) {
            console.log(err.message);
            this.end();
        })
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./app/dist/javascripts'));
});

// watch files and run corresponding task(s) once files are added, removed or edited.
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: './app/dist'
        }
    });

    gulp.watch('./app/source/index.html', ['inject']);
    gulp.watch('./app/source/sass/**/*.scss', ['compile-sass']);
    gulp.watch('./app/source/stylesheets/**/*.css', ['concat-css']);
    gulp.watch('./app/source/javascripts/**/*', ['browserify']);
    gulp.watch('./app/source/fonts/**', ['publish-fonts']);
    gulp.watch('./app/source/images/**', ['publish-images']);

    gulp.watch('./app/dist/index.html').on('change', browserSync.reload);
    gulp.watch('./app/dist/javascripts/*').on('change', browserSync.reload);
    gulp.watch('./app/dist/fonts/*').on('change', browserSync.reload);
    gulp.watch('./app/dist/images/*').on('change', browserSync.reload);
});

// default task
gulp.task('default', function (callback) {
    runSequence(['get-fonts', 'get-css', 'compile-sass'], ['publish-fonts', 'publish-images', 'concat-css', 'browserify'], 'inject', 'watch', callback);
});


/* ===============================================
================ For Production ==================
================================================*/

// minify ./app/dist/stylesheets/bundle.css and save as ./app/dist/stylesheets/bundle.min.css
gulp.task('minify-css', function () {
    return gulp.src('./app/dist/stylesheets/bundle.css')
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./app/dist/stylesheets'));
});

// uglify ./app/dist/javascripts/bundle.js and save as ./app/dist/javascripts/bundle.min.js
gulp.task('uglify-js', function () {
    return gulp.src('./app/dist/javascripts/bundle.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./app/dist/javascripts'));
});

// run 'minify-css' and 'uglify-js' at the same time
gulp.task('prod', ['minify-css', 'uglify-js']);
