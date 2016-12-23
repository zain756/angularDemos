var gulp = require ('gulp'),
   
	browserSync = require('browser-sync'),
	jshint = require('gulp-jshint');
 

gulp.task('jshint', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {beep: true}));
});

gulp.task('browser-sync', [], function () {
   var files = [
      'app/**/*.html',
      'app/styles/**/*.css',
      'app/images/**/*.png',
      'app/scripts/**/*.js',
      'app/views/**/*.html'
   ];

   browserSync.init(files, {
      server: {
         baseDir: "app",
         index: "index.html"
      }
   });
        // Watch any files in dist/, reload on change
  gulp.watch(['app/**/*']).on('change', browserSync.reload);
    });