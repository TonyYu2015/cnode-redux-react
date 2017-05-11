var path = require('path');
module.exports={
	entry : {
		build : './src/app.js'
	},
	output : {
		path : './dist/',
		filename : '[name].js'
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
	}
}