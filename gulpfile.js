const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      browserSync  = require('browser-sync'),
      babel        = require('gulp-babel'),
      autoprefixer = require('gulp-autoprefixer'),
      del          = require('del');

gulp.task('sass', () => {
return gulp.src('src/sass/**/*.sass')
           .pipe(sass({outputStyle: 'expanded'}))
           .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
           .pipe(gulp.dest('src/css'))
           .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: 'src'
        },
    notify: false
    });
});

gulp.task('es6', () => {
return gulp.src('src/js/src/*.js')
         .pipe(babel({
             presets: ['es2015'] 
         }))
         .pipe(gulp.dest('src/js/dest'));
});

gulp.task('clean', () => {
    return del.sync('dist');
});

gulp.task('watch', ['browser-sync', 'es6'], () => {
    gulp.watch('src/sass/**/*.sass', ['sass']);
    gulp.watch('src/js/src/*.js', ['es6']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'sass', 'es6'], () => {
    let buildCss = gulp.src('src/css/**/*')
        .pipe(gulp.dest('dist/css'));

    let buildJs = gulp.src('src/js/dest/*.js')
        .pipe(gulp.dest('dist/js/dest'));

    let buildHtml = gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));

    let buildImg = gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img'));

    let buildMusic = gulp.src('src/data/*')
        .pipe(gulp.dest('dist/data'));
});