/// sudo npm install gulp --save-dev
/// sudo npm install jshint gulp-jshint --save-dev
/// sudo npm install browser-sync--save-dev

var gulp = require ('gulp'),
    jshint = require('gulp-jshint'),
    //stylish = require('jshint-stylish'),
	 browserSync = require('browser-sync');

gulp.task('browser-sync',  function () {
   var files = [
      'app/**/*.html',
      'app/styles/**/*.css',
      'app/images/**/*.png',
      'app/scripts/**/*.js',
      //'build/**/*'
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
	

gulp.task('jshint', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default', {beep: true}));
});

