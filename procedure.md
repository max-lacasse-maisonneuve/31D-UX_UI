# Pour minifier les fichiers CSS et JS avec Gulp

https://www.toptal.com/javascript/optimize-js-and-css-with-gulp

1. Créer un fichier gulpfile.js à la racine du projet

2. Installer Gulp en global

```bash
npm install gulp-cli -g
```

```bash
npm install --save-dev gulp gulp-concat gulp-clean-css gulp-minify gulp-imagemin@7.1.0
```

3. Retirer le dossier node_modules du projet dans le fichier .gitignore
4. Ajouter les directives suivantes dans le fichier gulpfile.js

```javascript
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
```
