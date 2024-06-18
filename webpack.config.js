const path = require("path");
// const { merge } = require("webpack-merge");
const pug = require("pug");
const PugPlugin = require("pug-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const pugData = {
  srcPath: path.resolve(__dirname, "./src"),
  self: pug,
};
const commonConfig = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.(p|s)?css$/,
        use: ["css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new PugPlugin({
      pretty: "auto",
      entry: {
        main: {
          import: "./src/pages/main/index.pug",
          data: pugData,
          filename: "index.html",
        },
        stats: {
          import: "./src/pages/stats/index.pug",
          data: pugData,
          filename: "[name]/index.html",
        },
        game: {
          import: "./src/pages/game/index.pug",
          data: pugData,
          filename: "[name]/index.html",
        },
      },
      js: {
        filename: ({ chunk: { name } }) =>
          name !== "main" ? "[name]/scripts.js" : "scripts.js",
      },
      css: {
        filename: ({ chunk: { name } }) =>
          name !== "main" ? "[name]/styles.css" : "styles.css",
      },
      minify: true,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: true }),
      new CssMinimizerPlugin(),
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".pug", ".js", ".css", ".pcss", ".scss"],
  },
};
module.exports = commonConfig;
/* (env, argv) => {
  const config = require(
    `./tools/webpack.${env.WEBPACK_SERVE ? "development" : argv.mode}`,
  );

  return merge(commonConfig, config);
}; */
