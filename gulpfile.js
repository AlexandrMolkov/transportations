import gulp from 'gulp'
import pug from 'gulp-pug'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import groupCssMediaQueries from 'gulp-group-css-media-queries'
import cleanCss from 'gulp-clean-css'
import autoprefixer from 'gulp-autoprefixer'
import plumber from "gulp-plumber"
import notify from "gulp-notify"
import rename from 'gulp-rename'
import webp from 'gulp-webp'
import imagemin  from 'gulp-imagemin'
import mozjpeg  from 'imagemin-mozjpeg'
import optipng  from 'imagemin-optipng'
import fonterFix from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import {deleteAsync} from 'del'
import browserSync from 'browser-sync'
import webpack from 'webpack-stream'
//import babel from 'gulp-babel'
//import concat from 'gulp-concat'
//import uglifyjs from 'gulp-uglify'


const sass = gulpSass(dartSass);
const BUILD_FOLDER = './dist'
const SOURCE_FOLDER = './src'

const reset = () => {
    return deleteAsync(BUILD_FOLDER)
}

const html = ()=> {
    return gulp.src(`${SOURCE_FOLDER}/*.pug`)
        .pipe(plumber(
            notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
            )
        )
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest(BUILD_FOLDER))
        .pipe(gulp.src(`${SOURCE_FOLDER}/*.php`))
        .pipe(gulp.dest(BUILD_FOLDER))
        .pipe(browserSync.stream())
        
}

const scss = () => {
    return gulp.src(`${SOURCE_FOLDER}/style.scss`, {sourcemaps: true})
        .pipe(plumber(notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
        })))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(groupCssMediaQueries())
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserslist: ["last 3 versions"],
            cascade: true
        }))
        .pipe(gulp.dest(`${BUILD_FOLDER}/css`))
        .pipe(cleanCss())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(gulp.dest(`${BUILD_FOLDER}/css`))
        .pipe(gulp.src(`${SOURCE_FOLDER}/**.css`, {sourcemaps: true}))
        .pipe(gulp.dest(`${BUILD_FOLDER}/css`))
        .pipe(browserSync.stream())
}

const images = ()=> {
    return gulp.src(`${SOURCE_FOLDER}/img/**/*`)
        .pipe(plumber(
            notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(imagemin([
            mozjpeg({quality: 50, progressive: true}),
            optipng({optimizationLevel: 5}),
        ]))
        .pipe(gulp.dest(`${BUILD_FOLDER}/img`))
        .pipe(gulp.src(`${SOURCE_FOLDER}/img/**/*`))
        .pipe(webp({
            quality: 50
        }))
        .pipe(gulp.dest(`${BUILD_FOLDER}/img`)) 
}

const js = () => {
    return buildJS()
        .pipe(browserSync.stream()) 
}

const buildJS = ()=> {
    return gulp.src(`${SOURCE_FOLDER}/js/script.js`, {sourcemaps: true})
    .pipe(plumber(
        notify.onError({
            title: "JS",
            message: "Error: <%= error.message %>"
            }))
    )
    .pipe(webpack({
        mode: 'production',
        output: {
            filename: 'app.min.js',
        }
    }))
    .pipe(gulp.dest(`${BUILD_FOLDER}/js`))

    /*      .pipe(babel())
        .pipe(uglifyjs())
        .pipe(concat('all.js')) */
}

const watch = () => {
    gulp.watch(`${SOURCE_FOLDER}/**/*.pug`, html)
    gulp.watch(`${SOURCE_FOLDER}/**/*.scss`, scss)
    gulp.watch(`${SOURCE_FOLDER}/**/*.js`, js)
}

const server = () => {
    browserSync.init({
        server: {
            baseDir: `${BUILD_FOLDER}/`
        },
        notify: false,
        port: 3000,
    })
}

const fonts = () => {
    return gulp.src(`${SOURCE_FOLDER}/fonts/*.*`)
        .pipe(plumber(
            notify.onError({
                title: "Fonts",
                message: "Error: <%= error.message %>"
                }))
        )
        .pipe(gulp.dest(`${BUILD_FOLDER}/fonts`))

        .pipe(fonterFix({
			formats: ['woff']
		}))
        .pipe(gulp.dest(`${BUILD_FOLDER}/fonts`))

        .pipe(gulp.src(`${SOURCE_FOLDER}/fonts/*.*`))
        .pipe(ttf2woff2())
        .pipe(gulp.dest(`${BUILD_FOLDER}/fonts`))
}

const mainTasks = gulp.parallel(html,scss,js,images,fonts)

gulp.task('default', gulp.series(reset, mainTasks, gulp.parallel(watch, server)))
gulp.task('images', gulp.parallel(images))
gulp.task('scripts', gulp.parallel(buildJS))
gulp.task('fonts', gulp.parallel(fonts))