var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var install = require('gulp-install');
var jshint = require('gulp-jshint');
var run = require('gulp-run');

gulp.task('default', ['mochaTest', 'style']);


gulp.task('install', function() {
  gulp.src('./package.json') //gulp.src fetches the file and passes it on as an argument
    .pipe(install());
});

//////////////
//Helper tasks
//////////////

gulp.task('mochaTest', function() { //I am still not sure what it actually does
  // passing shared module in all tests (according to docs)
  return gulp.src('test/test.js', {
      read: false
    })
    .pipe(mocha({
      reporter: 'spec'
    })); //reporter spec is just the nested structure of Mocha output
});

gulp.task('testCoverage', function(cb) {
  gulp.src(['./*.js'])
    //Covering files; includeUntested is needed to include all files
    //and not only 'required' ones 
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function() {
      gulp.src(['test/test.js'])
        .pipe(mocha({
          reporter: 'spec'
        }))
        .pipe(istanbul.writeReports()) // Creating the reports after tests ran
        .on('end', cb);
    });
});

gulp.task('style', function() {
  gulp.src('./*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('upload', function() {
  run('git push azure').exec(); //this runs the deployment command
});

/////////////
//Main tasks
/////////////

gulp.task('test', ['mochaTest', 'style', 'testCoverage']);