const path = require('path');
const webpack = require('webpack');
module.exports=(env, argv) => {
	 
	return {
		entry : [
			'./src/app.js'// 我们 app 的入口文件
		],
		output : {
			path : path.resolve(__dirname,'../dist/'),
			filename : 'bundle.js' // 输出的打包文件
		},
		module : {
			rules : [
				{
					oneOf:[
						{
							test : /\.(js|jsx)$/,
							use:[
								{
									loader:"babel-loader",
									options : {
										"presets" : ["env","react"],
										"plugins" : ['react-hot-loader/babel']
									}
								}
							],
							exclude : /node_modules/
						},
						{
							test : /\.css?$/,
							use : [
								"style-loader",
								"css-loader"
							],
							exclude : /node_modules/
						}
					]
				}
			]
		},
		resolve : {
			extensions : ['.css','.js','.jsx']
		},
		devServer:{
			historyApiFallback:true
		},
		mode: env === 'development' ? 'development' : 'production'
	}
}