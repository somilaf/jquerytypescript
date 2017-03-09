//Definisanje potrebnih tranpajlera za galp.

var gulp = require('gulp');
var browserSync = require('browser-sync');
var typescript = require('gulp-typescript');
var concat = require('gulp-concat');
var less = require('gulp-less');
var path = require('path');
var wl = require('gulp-watch-less');
var lessprefix = require('less-plugin-autoprefix');
autoprefix = new lessprefix({ browsers: ["last 2 versions"] });
//Definisanje typesciprt transpajlera iz tsconfig.json 
var tsProject = typescript.createProject('tsconfig.json');



gulp.task('lessit', function () {
    return gulp.src('src/assets/less/main.less')
        .pipe(wl('less/file.less'))
        .pipe(less(({
            plugins: [autoprefix]
        })))
        .pipe(gulp.dest('./build/assets/css/'));
});
gulp.task('hello', function () {
    console.log('Waaazzuuuuuppp');
});

gulp.task('copyHtml', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('copyImages', function () {
    return gulp.src('src/assets/images/**/*.*')
        .pipe(gulp.dest('./build/assets/images/'))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('copyJLibs', function () {
    return gulp.src('src/assets/jslibs/**/*.*')
        .pipe(gulp.dest('./build/assets/jslibs/'))
        .pipe(browserSync.reload({ stream: true }));
})

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('watchFiles', function () {
    gulp.watch('src/*.html', ['copyHtml']);
    gulp.watch('src/**/*.less', ['lessit']);
    gulp.watch('src/assets/images/**/*.*', ['copyImages']);
    gulp.watch('src/assets/jslibs/**/*.*', ['copyJLibs']);
    gulp.watch('src/**/*.ts', ['tsit']);

});

gulp.task('tsit', function () {
    return gulp.src('src/**/*.ts')
        .pipe(typescript(tsProject))
        .pipe(gulp.dest('./build/'));
});

gulp.task('clean', function () {
    return gulp.src('./build', { read: false })
});


gulp.task('default', ['copyHtml', 'copyImages', 'copyJLibs', 'lessit', 'tsit', 'browserSync', 'watchFiles']);