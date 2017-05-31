const path = require('path');
const webpack = require('webpack');
var rootPath = path.resolve(__dirname,".."),//项目根目录
	src = path.join(rootPath,"src");//开发源码目录
var commonPath = {
	rootPath : rootPath,
	dist : path.join(rootPath,"dist"),//build后输出文件目录
	indexHtml : path.join(rootPath,"./src/index.html"),//入口基页
	staticDir : path.join(rootPath,"./static")//无需处理的静态资源目录
}

module.exports={
	commonPath : commonPath,
	entry : [
		'./src/app.js'// 我们 app 的入口文件
	],
	output : {
		path : './dist/',
		filename : 'bundle.js' // 输出的打包文件
	},
	module : {
		loaders : [
			{
				test : /\.jsx$/,
				loaders : ["react-hot","babel?presets[]=es2015&presets[]=react"],
				exclude : /node_modules/
			},
			{
				test : /\.js?$/,
				loaders : ["react-hot","babel?presets[]=es2015&presets[]=react"],
				exclude : /node_modules/
			},
			{
				test : /\.css?$/,
				loaders : ["style","css"],
				exclude : /node_modules/
			}
		]
	},
	resolve : {
		extensions : ['','.css','.js','.jsx']
	},
	devServer:{
		historyApiFallback:true
	}
}