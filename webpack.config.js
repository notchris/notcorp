const webpack = require('webpack');
const path = require("path");
const pathToPhaser = path.join(__dirname, "/node_modules/phaser/");
const phaser = path.join(pathToPhaser, "dist/phaser.js");

module.exports = {
  entry: "./game.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader", exclude: "/node_modules/" },
      { test: /phaser\.js$/, loader: "expose-loader?Phaser" },
      {
        test: /\.png$/,
        loader: "url-loader?mimetype=image/png" 
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
        "WEBGL_RENDERER": true,
        "CANVAS_RENDERER": true
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./"),
    publicPath: "/dist/",
    host: "127.0.0.1",
    port: 8080,
    open: true
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      phaser: phaser
    }
  }
};
