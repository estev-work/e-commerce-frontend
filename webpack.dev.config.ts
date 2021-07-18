import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";

const config: webpack.Configuration = {
	mode: "development",
	output: {
		publicPath: "/",
	},
	entry: "./src/index.tsx",
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/i,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-react",
							"@babel/preset-typescript",
						],
					},
				},
			},
			{
				test: /\.scss$/, use: [
					{loader: "style-loader"},  // to inject the result into the DOM as a style block
					{loader: "css-modules-typescript-loader"},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
					{loader: "css-loader", options: {modules: true}},  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
					{loader: "sass-loader"},  // to convert SASS to CSS
					// NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
				]
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", '.scss'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "public/index.html",
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ForkTsCheckerWebpackPlugin({
			async: false,
		}),
		new ESLintPlugin({
			extensions: ["js", "jsx", "ts", "tsx", 'scss'],
		}),
	],
	devtool: "inline-source-map",
	devServer: {
		contentBase: path.join(__dirname, "build"),
		historyApiFallback: true,
		port: 4000,
		open: true,
		hot: true,
	},
};

export default config;
