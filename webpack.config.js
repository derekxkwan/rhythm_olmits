const path = require('path');

//BEGIN CODE FROM https://stackoverflow.com/questions/40426378/webpack-ts-loader-change-tsconfig-filename
let rfile = path.resolve(__dirname, "tspublic", "index.tsx");
let outdir = path.resolve(__dirname, "public");

//END CODE FROM https://stackoverflow.com/questions/40426378/webpack-ts-loader-change-tsconfig-filename

//BEGIN CODE FROM https://stackoverflow.com/questions/40426378/webpack-ts-loader-change-tsconfig-filename
module.exports = {
	entry: [rfile],
	mode: 'production',
	watch: false,
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [{
                        loader: 'ts-loader',
                        options: {
                            configFile: "tsconfig_public.json"
                        }
                }],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [ '.ts', '.js', '.tsx', '.jsx' ],
	},
	output: {
		filename: 'bundle.js',
		path: outdir,
	},
};

//END CODE FROM https://stackoverflow.com/questions/40426378/webpack-ts-loader-change-tsconfig-filename
