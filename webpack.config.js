var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var production = process.env.NODE_ENV === 'production';

var plugins = [
	new webpack.optimize.CommonsChunkPlugin({
		name: 'main',
		children: true,
		minChunks: 2
	})
];

if (production) {
	plugins = plugins.concat([
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.MinChunkSizePlugin({
			minChunkSize: 512000, // ~50 kb
		}),
		// I don't actually want to obfuscate.
		// new webpack.optimize.UglifyJsPlugin({
		// 	mangle: true,
		// 	compress: {
		// 			warnings: false, // Suppress uglification warnings
		// 	},
		// }),
		new webpack.DefinePlugin({
			__SERVER__: !production,
			__DEVELOPMENT__: !production,
			__DEVTOOLS__: !production,
			'process.env': {
					BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		}),
		new CleanPlugin('public/builds'),
	])
}

module.exports = {
	entry: './src',
	output: {
		path: 'public/builds',
		filename: production ? '[name]-[hash].js' : 'app.js',
		chunkFilename: '[name]-[hash].js',
		publicPath: 'builds/'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			include: path.join(__dirname, 'src'),
			query: {
				presets: ['es2015'],
			},
		}, {
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass'],
		}, {
			test: /\.html$/,
			loader: 'html',
		}]
	},
	plugins: plugins,
	devtool: production ? false : 'eval',
	debug: !production,
	devServer: {
		contentBase: 'public',
		colors: true,
		historyApiFallback: true,
		inline: true,
		hot: true,
		stats: 'error-only',
	},
};
