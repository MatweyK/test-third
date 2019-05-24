var gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('sass', async function(){
	gulp.src('./assets/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
	    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:watch', function(){
	gulp.watch('./assets/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('browser-sync', function() {
	browserSync.init(["./assets/css/*.css", "./**/*.html"], {
		 server: {
			baseDir: "./"
		 }

	})
});

gulp.task('watch', gulp.series('sass', gulp.parallel('browser-sync', 'sass:watch')));


gulp.task('default', gulp.series('watch'));

