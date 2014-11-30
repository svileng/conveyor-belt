var gulp = require("gulp")
var gutil = require("gulp-util")
var to5 = require("gulp-6to5")
var mocha = require("gulp-mocha")

gulp.task("es6", function() {
    return gulp.src("src/**/*.js")
        .pipe(to5())
        .on("error", function(err) {
            console.log("Error compiling to ES5:\n" + err.message)
            this.emit("end")
        })
        .pipe(gulp.dest("dist"))
})

gulp.task("mocha", ["es6"], function() {
    return gulp.src("tests/*.spec.js")
        .pipe(mocha({reporter: "list"}))
        .on("error", function (err) {
            gutil.log(gutil.colors.red("Error while running test suite"))
            this.emit("end")
        })
})

gulp.task("watch", function() {
    gulp.watch("src/**/*.js", ["es6", "mocha"])
    gulp.watch("tests/*.spec.js", ["mocha"])
})

gulp.task("default", ["es6", "mocha", "watch"])
