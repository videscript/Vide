const gulp = require('gulp');
const minify = require('gulp-minify');
const rm = require('rimraf');
const { readdirSync, unlinkSync } = require('fs');
const exfs = require('fs-extra');
function defaultTask(done) {
  rm.sync('package/bin');
  gulp
    .src('out/*.js')
    .pipe(minify({ noSource: true, ext: { min: '.js' } }))
    .pipe(gulp.dest('package/bin'));
  exfs.copySync('out/lib', 'package/bin/lib');
  gulp
    .src('out/extensions/backend-router/*.js')
    .pipe(minify({ noSource: true, ext: { min: '.js' } }))
    .pipe(gulp.dest('package/bin/extensions/backend-router'));
  gulp
    .src('out/extensions/client-interface/*.js')
    .pipe(minify({ noSource: true, ext: { min: '.js' } }))
    .pipe(gulp.dest('package/bin/extensions/client-interface'));
  rm.sync('out/test');
  done();
}

exports.default = defaultTask;
