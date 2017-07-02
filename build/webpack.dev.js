const path = require('path');
const webpack = require('webpack');
module.exports={
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
				test : /\.jsx$/,
                use:[
                    {
                        loader:"react-hot-loader",
                    },
                    {
                        loader:"babel-loader",
                        options : {
                            "presets" : ["env","react"]
                        }
                    }
                ],
				exclude : /node_modules/
			},
			{
				test : /\.js?$/,
				use:[
                    {
                        loader:"react-hot-loader",
                    },
                    {
                        loader:"babel-loader",
                        options : {
                            "presets" : ["env","react"]
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
	},
	resolve : {
		extensions : ['.css','.js','.jsx']
	},
	devServer:{
		historyApiFallback:true
	}
}