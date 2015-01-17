var gulp = require('gulp');
var run = require('gulp-run');
var gulpNgConfig = require('gulp-ng-config');

gulp.task('default', function() {
  if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
  	run('gulp configprod').exec(); 
  } else {
    run('gulp configdev').exec(); 
    run('node server.js').exec(); 
  }
});

gulp.task('configprod', function() {
  gulp.src('config.json')
    .pipe(gulpNgConfig('producerFrontEnd.config', {
      constants: {
        backend: 'http://productest.azurewebsites.net'
      }
     }))
    .pipe(gulp.dest('./app'));
})

gulp.task('configdev', function() {
  gulp.src('config.json')
    .pipe(gulpNgConfig('producerFrontEnd.config'))
    .pipe(gulp.dest('./app'));
})