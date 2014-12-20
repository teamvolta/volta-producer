var gulp = require('gulp');
var mocha = require('gulp-mocha');
var install = require('gulp-install');
var jshint = require('gulp-jshint');

gulp.task('default', function() {
  // default task will be added here
  gulp.src('./*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'));
  
  gulp.src('./package.json') //gulp.src fetches the file and passes it on as an argument
  .pipe(install());
});

gulp.task('test', function() {  //I am still not sure what it actually does
	                            // passing shared module in all tests (according to docs)
  return gulp.src('test/test.js', {read: false})   
         .pipe(mocha({reporter: 'spec'}));  //reporter spec is just the nested structure of Mocha output
});

gulp.task('style', function() {
  gulp.src('./*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('deploy', function () {
  
});