'use strict';

var gulp, gulpLess, del, less, LessPluginAutoPrefix, autoprefix, cssmin, rename;

gulp = require('gulp');
gulpLess = require('gulp-less');
del = require('del');
cssmin = require('gulp-minify-css');
rename = require('gulp-rename');

LessPluginAutoPrefix = require("less-plugin-autoprefix");

// 自动加上 css 前缀
autoprefix = new LessPluginAutoPrefix({
  browsers: ["ie >= 8", "ie_mob >= 10", "ff >= 26", "chrome >= 30", "safari >= 6", "opera >= 23", "ios >= 5", "android >= 2.3", "bb >= 10"]
});

gulp.task('default', function(){
  console.log('gulp b     编译');
  console.log('gulp w     实时监控并编译');
});

gulp.task('clean', function(cb){
  return del('./build/*', cb);
})

gulp.task('b', ['clean'], function () {
  gulp.src('src/bootstrap.less')
    .pipe(gulpLess({
      plugins: [autoprefix]
    }))
    .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: '*',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
    .pipe(rename({ suffix: '.csn.min' }))
    .pipe(gulp.dest('./build'));
});

gulp.task('w', function () {
  gulp.watch('./src/**', ['b'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
