var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('default', ['serve']);

var folder = 'cbtnuggets';
var filename = 'template.html';
var input = {};

gulp.task('serve', function () {
	browserSync.init({
		server: './' + folder
	});
	gulp.watch('./' + folder + '/*.html').on('change', reload);
});