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
const generateCss = () => 
    src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./src/public/css/'));


const generateJs = () => 
    pipeline(
        src('./src/clientjs/*.js'),
        concat('prod.min.js'),
        uglify(),
        dest('./src/public/js/')
    );

const clean = () =>
    del(['./dist/public/', './dist/templates']);


const copyPublic = () => 
    src('./src/public/**').pipe(dest('./dist/public/'));


const copyTemplates = () => 
    src('./templates/**').pipe(dest('./dist/templates/'));

const cleanSourcemap = () => 
    del([
        './dist/public/css/main.css.map',
    ]);


const watchAll = () => {
    browserSync.init({
        port: 3002,
        proxy: 'http://localhost:8080/',
        reloadDelay: 1000
    });

    watch(['./**/*.ts', './**/*.njk']).on("change", () => setTimeout(() => browserSync.reload(), 1000));
    watch(['./src/sass/**/*.scss'], series(generateCss)).on("change", browserSync.reload);
    watch(['./src/clientjs/**/*.js'], series(generateJs)).on("change", browserSync.reload);

};

//Primary tasks
exports.build = series(clean, parallel(generateCss, generateJs), copyPublic, copyTemplates, cleanSourcemap);

exports.dev = series(clean, parallel(generateCss, generateJs), watchAll);