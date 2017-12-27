var gulp = require('gulp'),
	browserSync = require('browser-sync').create();

var reload = browserSync.reload;


gulp.task('browserSync',  function() {
	browserSync.init({
		server: { baseDir: '.'},
		notify: false,
		ghostMode: {
          clicks: true,
          location: true,
          forms: true,
          scroll: false
      }
	});
});

gulp.task('html', function(){
  gulp.src('./index.html')
  .pipe(reload({stream:true}));
});

gulp.task('watch', function() {
	gulp.watch('./**/*.js', browserSync.reload);
	 gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', ['browserSync','html', 'watch']);


