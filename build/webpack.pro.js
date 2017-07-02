const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
	entry : [
		'./src/app.js'// 我们 app 的入口文件
	],
	output : {
		path :path.resolve(__dirname,'../dist/'),
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
	},
    plugins: [
    new webpack.DefinePlugin({
        "process.env": { 
            NODE_ENV: JSON.stringify("production") 
        }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    })
  ]
}