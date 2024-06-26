const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	mode: 'production',
	output: {
		filename: 'index.js',
		path: __dirname
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['ts-loader'],
				resolve: {
					extensions: ['.tsx', '.ts']
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
				resolve: {
					extensions: ['.css']
				}
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './template/index.html',
			favicon: './template/favicon.ico'
		})
	]
};
