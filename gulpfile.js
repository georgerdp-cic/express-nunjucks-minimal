const { src, dest, task, series, watch } = require('gulp');
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
task('generate-css', () => 
    src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./src/public/css/'))
);

task('generate-js', () => 
    pipeline(
        src('./src/clientjs/*.js'),
        concat('prod.min.js'),
        uglify(),
        dest('./src/public/js')
    )
);

task('copy-public', () => {
    return src('./src/public/**').pipe(dest('./dist/public/'));
});

task('copy-templates', () => {
    return src('./templates/**').pipe(dest('./dist/templates/'));
});

task('clean', () => {
    return del([
        './dist',
    ]);
});

task('clean-sourcemap', () => {
    return del([
        './dist/public/css/main.css.map',
        './dist/public/js/prod.min.js.map'
    ]);
});

task('watch-all', () => {
    browserSync.init({
        port: 3002,
        proxy: 'http://localhost:8080/',
        reloadDelay: 1000
    });

    watch(['./**/*.ts', './**/*.njk']).on("change", () => setTimeout(() => browserSync.reload(), 1000));
    watch(['./src/sass/**/*.scss'], series('generate-css')).on("change", browserSync.reload);
    watch(['./src/clientjs/**/*.js'], series('generate-js')).on("change", browserSync.reload);
});

//Primary tasks
task('build', series(['clean', 'generate-css', 'generate-js', 'copy-public', 'copy-templates', 'clean-sourcemap']));

task('dev', series(['clean', 'generate-css', 'generate-js', 'watch-all']));