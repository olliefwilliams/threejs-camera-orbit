'use strict';
let gulp = require('gulp'),

	path = "httpdocs",
	cssSrc = `${path}/css/src`,
	cssDist = `${path}/css/dist`,
	jsSrc = `${path}/js/src`,
	jsDist = `${path}/js/dist`,

	sass = require('gulp-sass')(require('sass')),
	autoprefixer = require('gulp-autoprefixer'),


	source = require('vinyl-source-stream'),
	browserify = require('browserify'),
	babelify = require('babelify');


gulp.task('sass', function () {
	return gulp.src(`${cssSrc}/**/*.scss`) // Gets all files ending with .scss and child dirs

		.pipe(sass({
			indentType: "tab",
			indentWidth: 1
		}).on('error', sass.logError)) // compile sass
		.pipe(autoprefixer()) // run autoprefixer (autoprefixer takes its rules from the "browserslist" entry in the package file)
		.pipe(gulp.dest(cssDist)) // write all css files
});

// this is expecting only 1 file
gulp.task('js', function () {
	return (browserify(`${jsSrc}/main.js`) // first allow includes/require
		.transform("babelify", { presets: ["@babel/preset-env"] }) // then use babelify with a browserify transform to transpile to ES5 with preset environment defined
		.bundle()) // combines all files and dependencies into a single file
		.pipe(source('main.js')) // convert readable/(text) stream to vinyl stream gulp is expecting, this needs to be named again as the stream from browserify has no name
		.pipe(gulp.dest(jsDist))
});


gulp.task('watch', function () {
	gulp.watch(`${cssSrc}/**/*.scss`, { ignoreInitial: false, usePolling: true }, gulp.series(['sass']));
	gulp.watch(`${jsSrc}/**/*.js`, { ignoreInitial: false, usePolling: true }, gulp.series(['js']));
});

