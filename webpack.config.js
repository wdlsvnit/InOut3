module.exports = {
	entry: './app/js/main.js',
	output: {
		filename: './inout/static/inout/js/bundle.js'
	},
	watch:true,
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['stage-2', 'es2015']
				}
			}
		]
	}
};

