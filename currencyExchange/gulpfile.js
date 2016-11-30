


var gulp = require ('gulp'),
   
	browserSync = require('browser-sync');
	
 


gulp.task('browser-sync', [], function () {
   var files = [
      'app/**/*.html',
      'app/css/**/*.css',
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
	