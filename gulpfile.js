var gulp = require('gulp');

var browserSync = require('browser-sync').create(),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	ngmin = require('gulp-ngmin'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
	gulp.src("./src/styles/**/*.scss")
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(gulp.dest('./dist/styles'));
});

gulp.task('js', function(){
	gulp.src("./src/scripts/**/*.js")
	.pipe(concat('scripts.js'))
	.pipe(babel({
	    presets: ['es2015']
	}))
	.pipe(uglify({mangle: false}))
	.pipe(gulp.dest('./dist/scripts'));
});

gulp.task('browser-sync', ['sass', 'js'], function() {
	browserSync.init({
	    server: {
	        baseDir: "./"
	    }
	});
	gulp.watch("./src/styles/**/*.scss", ['sass']).on('change', browserSync.reload);
	gulp.watch("./src/scripts/**/*.js", ['js']).on('change', browserSync.reload);
	gulp.watch("./**/*.html").on('change', browserSync.reload);
});

gulp.task('watch', ['browser-sync'], function(){
	
})
gulp.task('default', ['watch']);