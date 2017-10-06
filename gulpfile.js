const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      browserSync  = require('browser-sync'),
      babel        = require('gulp-babel'),
      autoprefixer = require('gulp-autoprefixer'),
      concat       = require('gulp-concat'),
      uglify       = require('gulp-uglifyjs');

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

gulp.task('scripts', () => {
    return gulp.src([
        'src/libs/jquery/dist/jquery.min.js',
        'src/libs/jPlayer/dist/jplayer/jquery.jplayer.min.js',
        'src/libs/jPlayer/dist/add-on/jplayer.playlist.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'));
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

gulp.task('build', ['clean', 'sass', 'es6', 'scripts'], () => {
let buildCss = gulp.src('src/css/**/*')
    .pipe(gulp.dest('dist/css'));

let buildJs = gulp.src(['src/js/dest/*.js', 'src/js/libs.min.js'])
    .pipe(gulp.dest('dist/js'));

let buildHtml = gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));

});