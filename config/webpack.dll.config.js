// No need to build the DLL in production
if (process.env.NODE_ENV === 'production') {
	process.exit(0);
}

const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');
const pkg = require(paths.appPackageJson);

// Read the dll configuration from package.json
const config = pkg.dllConfig;
const servedPath = paths.appDllPath;

module.exports = {
	devtool: 'inline-source-map',
	entry: {
		vendor: [...config.packages],
	},
	performance: {
		hints: false,
	},
	output: {
		path: servedPath,
		filename: '[name].dll.js',
		library: '[name]_[hash]',
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(servedPath, '[name]-manifest.json'),
			name: '[name]_[hash]',
		}),
	],
};
