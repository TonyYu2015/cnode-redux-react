const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
		plugins: [
			new webpack.DllReferencePlugin({
				context: __dirname, 
				manifest: path.resolve(__dirname, '../dist/vendor-manifest.json')
			}),
			new HtmlWebpackPlugin({
				title: 'cnode',
				filename: path.resolve(__dirname, '../dist/index.html')
			})	
		],
		resolve : {
			extensions : ['.css','.js','.jsx']
		},
		devServer:{
			historyApiFallback:true
		},
		mode: env === 'development' ? 'development' : 'production'
	}
}