const { src, dest, task, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

//Child tasks
task('generate-css', () => {
    return src('./src/sass/**/*.scss')
        .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('./src/public/css/'));
});

task('copy-public', () => {
    return src('./src/public/**').pipe(dest('./dist/public/'));
});

task('copy-templates', () => {
    return src('./templates/**').pipe(dest('./dist/templates/'));
});

task('clean', () => {
    return del([
        './dist/public/**',
        './dist/templates/'
    ]);
});

task('watch-css', () => {
    watch(['./src/sass/*.scss'], series('generate-css'));
    //watch(['./src/js/*.js'], series('generate-js'));
});

//Primary tasks
task('build', series(['clean', 'generate-css', 'copy-public', 'copy-templates']));

task('dev', series(['clean', 'generate-css', 'watch-css']));