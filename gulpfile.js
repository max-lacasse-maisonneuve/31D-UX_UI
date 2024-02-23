const gulp = require("gulp");
const concat = require("gulp-concat");
const cleanCss = require("gulp-clean-css");
const minify = require("gulp-minify");
const imagemin = require("gulp-imagemin");

// Concat and minify CSS files
//gulp.task = déclare une tâche
//gulp.src = indique le fichier source
//Concat = le fichier minifié
//cleanCss = minifie le fichier
//gulp.dest = indique le dossier de destination
gulp.task("build-css", () => {
    return gulp.src("assets/css/*.css").pipe(concat("stylesFinaux.css")).pipe(cleanCss()).pipe(gulp.dest("build/css"));
});

gulp.task("build-js", () => {
    return gulp.src("assets/js/*.js").pipe(concat("scriptFinal.js")).pipe(minify()).pipe(gulp.dest("build/js"));
});
gulp.task("min-images", () => {
    return gulp
        .src("assets/img/**")
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 50, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [
                        {
                            name: "removeViewBox",
                            active: true,
                        },
                        {
                            name: "cleanupIDs",
                            active: false,
                        },
                    ],
                }),
            ])
        )
        .pipe(gulp.dest("build/images"));
});

gulp.task("session-start", (callback) => {
    return gulp.series("build-css", "build-js", "min-images")(callback);
});

gulp.task("default", gulp.series("session-start"));
