var webpack = require('webpack');
var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ["./src/app.js"],
    output: {
		path: path.resolve(__dirname, 'dist'),
		
		filename: 'app.bundle.js'
    },
	devServer: {
		contentBase:'src'
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				test: /\.html$/,
				loader: "raw-loader"
			},
			{
				test: /\.jpg|.png$/,
				loader: "file-loader?name=[path][name].[ext]"
			}
		]
	},
	plugins: [
        new CopyWebpackPlugin([
			{
				from: 'src/index.html',
				to: '.'
			},
			{
				from: 'src/pictures',
				to: 'pictures'
			},
			{
				from: 'src/documents',
				to: 'documents'
			}
		])
	]
};