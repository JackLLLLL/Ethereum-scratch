const paths = require("./path");

const clientConfig = {
  devtool: "cheap-module-source-map",
  target: "web",
  entry: paths.cilentJs,
  output: {
    path: paths.cilentDist,
    pathinfo: true,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svf|jpg)$/,
        use: ["img-loader?limit=10000"]
      }
    ]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".web.js", ".js", ".json", ".web.jsx", ".jsx"]
  }
};
module.exports = clientConfig;