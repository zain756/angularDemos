/*
	npm install -g gulp                 //for globaly
npm install gulp --save-dev         //for locally
npm install --save-dev gulp-connect-php     //php server 
npm install gulp-imagemin --save-dev
npm install gulp-minify-css --save-dev
npm install gulp-autoprefixer --save-dev
npm install gulp-concat --save-dev
npm install gulp-changed --save-dev
npm install del --save-dev
npm install gulp-browser-sync 
*/




var gulp = require ('gulp'),
    usemin = require('gulp-usemin'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	concat = require('gulp-concat'),
    changed = require('gulp-changed'),
	del = require('del');
    autoprefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
	htmlmin = require('gulp-htmlmin'),
	browserSync = require('browser-sync');
	rev = require('gulp-rev'),
 
gulp.task('clean', function(){
	 return del(['build']);
});	
	

gulp.task('imagemin', function() {
   var img_src = 'src/images/**/*', img_dest = 'build/images';

   return gulp.src(img_src)
   //.pipe(changed(img_dest))
   .pipe(imagemin())
   .pipe(gulp.dest(img_dest));
});

gulp.task('styles', function() {
   return gulp.src(['src/css/*.css'])
   //.pipe(concat('styles.css'))
   .pipe(autoprefix('last 2 versions'))
   .pipe(minifyCSS())
   .pipe(gulp.dest('build/css/'));
});

gulp.task('minifyhtml', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
});

gulp.task('copy',function(){
return gulp.src(['src/scripts/*.js'])
	.pipe(gulp.dest('build/scripts'));
	
	
});

gulp.task('browser-sync', ['default'], function () {
   var files = [
      'src/**/*.html',
      'src/css/**/*.css',
      'src/images/**/*.png',
      'src/scripts/**/*.js',
      'build/**/*'
   ];

   browserSync.init(files, {
      server: {
         baseDir: "build",
         index: "index.html"
      }
   });
        // Watch any files in dist/, reload on change
  gulp.watch(['build/**']).on('change', browserSync.reload);
    });
	
	
gulp.task('dev-browser-sync', ['default'], function () {
   var files = [
      'src/**/*.html',
      'src/css/**/*.css',
      'src/images/**/*.png',
      'src/scripts/**/*.js'
      
   ];

   browserSync.init( {
      server: {
         baseDir: "src",
         index: "index.html"
      }
   });
        // Watch any files in dist/, reload on change
  gulp.watch(['src/**']).on('change', browserSync.reload);
    });	
	
	
// Watch
gulp.task('watch', ['browser-sync'], function() {
  // Watch .js files
  gulp.watch('{src/scripts/**/*.js,src/css/**/*.css,src/**/*.html}', ['default']);
      // Watch image files
  //gulp.watch('app/src/**/*', ['imagemin']);

});

gulp.task('jshint', function() {
  return gulp.src('src/scripts/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

gulp.task('usemin',['jshint'], function () {
  return gulp.src('src/index.html')
    .pipe(usemin({
      css:[minifyCSS(), rev()],
      js: [rev()]
    }))
    
    .pipe(gulp.dest('build/'));
});

gulp.task('default', ['clean'], function() {
	//gulp.start('imagemin','styles', 'minifyhtml', 'copy', 'jshint' );
	gulp.start('imagemin','usemin', 'minifyhtml' );
});