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

autoprefixer = require('gulp-autoprefixer');
// 版本号
var APP_VERSION = 'v.1.0';

gulp.task('js', function() {
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
        // 5. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'))
});

gulp.task('css', function() {
    // 1. 找到文件
    gulp.src('css/*.css')
        // 2. 压缩文件
        .pipe(cssnano())
        .pipe(concat('all.css'))
        // 3. 另存为压缩文件
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('images', function() {
    // 1. 找到图片
    gulp.src('images/*.*')
        // 2. 压缩图片
        .pipe(imagemin({
            progressive: true
        }))
        // 3. 另存图片
        .pipe(gulp.dest('dist/images'))
});
gulp.task('html', function() {
    var options = {
        collapseWhitespace: true, //压缩HTML
        //省略布尔属性的值 <input checked="true"/> ==> <input />
        collapseBooleanAttributes: false,
        //删除所有空格作属性值 <input id="" /> ==> <input />
        removeEmptyAttributes: true,
        //删除<script>的type="text/javascript"
        removeScriptTypeAttributes: true,
        //删除<style>和<link>的type="text/css"
        removeStyleLinkTypeAttributes: true,
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    gulp.src('*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});