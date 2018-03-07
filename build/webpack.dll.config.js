const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['react',
             'jquery',
             'bootstrap',
             'react-dom',
             'isomorphic-fetch',
             'react-redux',
             'react-router-dom',
             'redux',
             'redux-logger',
             'redux-thunk',
             'popper.js']
  },
  output:{
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins:[
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../dist', '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
}