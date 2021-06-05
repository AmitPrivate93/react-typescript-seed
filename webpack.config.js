const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";

const config = {
  entry: ['@babel/polyfill',path.join(__dirname, "src", "index.js")],
  output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
  mode: process.env.NODE_ENV || "development",
  resolve: { 
		modules: [path.resolve(__dirname, "src"), "node_modules"] ,
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
  devServer: { contentBase: path.join(__dirname, "src") },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
};

if (isProd) {
config.optimization = {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
};
} else {
config.devServer = {
    port: 9000,
    open: true,
    hot: true,
    compress: true,
    stats: "errors-only",
    overlay: true,
};
}

module.exports = config;

module.exports = config;
