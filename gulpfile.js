var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open =require('open');

var app = {
	srcPath: 'src/',
	devPath: 'build/',
	prdPath: 'dist/'
};

gulp.task('lib', function() {
	gulp.src('bower_components/**/*.js')
		.pipe(gulp.dest(app.devPath + 'vendor'))
		.pipe(gulp.dest(app.prdPath + 'vendor'))
		// 通知服务器进行刷新
		.pipe($.connect.reload());
});

gulp.task('html', function(){
	gulp.src(app.srcPath + '**/*.html')
		.pipe(gulp.dest(app.devPath))
		.pipe(gulp.dest(app.prdPath))
		.pipe($.connect.reload());
});

gulp.task('json', function(){
	gulp.src(app.srcPath + 'data/**/*.json')
		.pipe(gulp.dest(app.devPath + 'data'))
		.pipe(gulp.dest(app.prdPath + 'data'))
		.pipe($.connect.reload());
});

gulp.task('less', function(){
	gulp.src(app.srcPath + 'style/index.less')
		.pipe($.less())
		.pipe(gulp.dest(app.devPath + 'css'))
		.pipe($.cssmin())
		.pipe(gulp.dest(app.prdPath + 'css'))
		.pipe($.connect.reload());
});

gulp.task('js', function(){
	gulp.src(app.srcPath + 'script/**/*.js')
		.pipe($.concat('index.js'))
		.pipe(gulp.dest(app.devPath + 'js'))
		.pipe($.uglify())
		.pipe(gulp.dest(app.prdPath + 'js'))
		.pipe($.connect.reload());
});

gulp.task('image', function(){
	gulp.src(app.srcPath + 'image/**/*')
		.pipe(gulp.dest(app.devPath + 'image'))
		.pipe($.imagemin())
		.pipe(gulp.dest(app.prdPath + 'image'))
		.pipe($.connect.reload());
});

gulp.task('build', ['image', 'js', 'less', 'lib', 'html', 'json']);

gulp.task('clean', function(){
	gulp.src([app.srcPath, app.prdPath])
		.pipe($.clean());
});

// 启动服务器
gulp.task('serve', ['build'], function(){
	$.connect.server({
		// 读取路径
		root: [app.devPath],
		// 热重载
		livereload: true,
		port: 8080
	});

	open('http://localhost:8080');

	// 监听文件变更，执行构建任务
	gulp.watch('bower_components/**/*', ['lib']);
	gulp.watch(app.srcPath + '**/*.html', ['html']);
	gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
	gulp.watch(app.srcPath + 'style/index.less', ['less']);
	gulp.watch(app.srcPath + 'script/**/*.js', ['js']);
	gulp.watch(app.srcPath + 'image/**/*', ['image']);
});

gulp.task('default', ['serve']);