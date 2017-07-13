var gulp = require('gulp'),
    // js 压缩插件 （用于压缩 JS）
    uglify = require('gulp-uglify'),
    // 压缩css插件(cssnano将取代gulp-minify-css)
    babel = require('gulp-babel'),
    cssnano = require('gulp-cssnano'),
    // 获取 gulp-imagemin 模块
    imagemin = require('gulp-imagemin'),
    // 重命名 插件
    rename = require('gulp-rename'),
    // 压缩html插件
    htmlmin = require('gulp-htmlmin'),
    // 合并文件
    concat = require("gulp-concat"),
    // html 文件对合并文件后的替换处理插件
    htmlReplace = require("gulp-html-replace"),
    // 复制文件（文件拷贝）
    copy = require('gulp-copy');

// 版本号
var APP_VERSION = 'v.1.0';

gulp.task('ugconjs', function() {
    // 1. 找到文件
    gulp.src(['js/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        // 2. 压缩文件
        .pipe(uglify())
        // 3. 合并成一个文件
        .pipe(concat('all.js'))
        // 4. 改名
        .pipe(rename(function(path) {
            path.basename += "_" + APP_VERSION;
        }))
        // 5. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'))
});