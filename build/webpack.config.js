const path = require('path');
const webpack = require('webpack');
module.exports={
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