const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require("gulp-uglify");
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const del = require('del');
const pipeline = require('readable-stream').pipeline;
var sourcemaps = require('gulp-sourcemaps');

//Child tasks
const generateCss = (cb) => {
    src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./src/public/css/'));
    
    cb();
};

const generateJs = (cb) => {
    pipeline(
        src('./src/clientjs/*.js'),
        concat('prod.min.js'),
        uglify(),
        dest('./src/public/js')
    );

    cb();
};

const copyPublic = (cb) => {
    src('./src/public/**').pipe(dest('./dist/public/'));
    cb();
};

const copyTemplates = (cb) => {
    src('./templates/**').pipe(dest('./dist/templates/'));
    cb();
};

const clean = (cb) => {
    del([
        './dist',
        './src/public/js/'
    ]);
    cb();
};

const cleanJs = (cb) => {
    del([
        './src/public/js/'
    ]);
    cb();
};

const cleanSourcema = () => {
    del([
        './dist/public/css/main.css.map',
        './dist/public/js/prod.min.js.map'
    ]);
    cb();
};

const watchAll = (cb) => {
    browserSync.init({
        port: 3002,
        proxy: 'http://localhost:8080/',
        reloadDelay: 500
    });

    watch(['./**/*.ts', './**/*.njk']).on("change", () => setTimeout(() => browserSync.reload(), 1000));
    watch(['./src/sass/**/*.scss'], series(generateCss)).on("change", browserSync.reload);
    watch(['./src/clientjs/**/*.js'], series(generateJs)).on("change", browserSync.reload);

    cb();
};

//Primary tasks
exports.build = series(clean, parallel(generateCss, generateJs), copyPublic, copyTemplates, cleanSourcema);

exports.dev = series(clean, parallel(generateCss, generateJs), watchAll);