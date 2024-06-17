const path = require("path");
// const { merge } = require("webpack-merge");
const pug = require("pug");
const PugPlugin = require("pug-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const commonConfig = {
  // entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
  },
  resolve: {
    extensions: [".js"],
    alias: {},
    plugins: [],
  },
  module: {
    rules: [
      {
        test: /\.pcss$/,
        use: [MiniCssExtractPlugin.loader, "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new PugPlugin({
      pretty: "auto",
      entry: {
        import: "./src/index.pug",
        data: {
          srcPath: path.resolve(__dirname, "./src"),
          self: pug,
        },
        filename: "./dist/index.html",
      },
      js: {
        filename: `./dist/[name].js`,
      },
      css: {
        filename: `./dist/[name].css`,
      },
      minify: true,
    }),
    // new MiniCssExtractPlugin({
    //   filename: (pathData) => {
    //     const { filenameTemplate: filename = '' } = pathData?.chunk ?? {};
    //     return filename.includes('common')
    //       ? 'styles-common.css'
    //       : `modules/${moduleCode}-test/styles.css`;
    //   },
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: false }),
      new CssMinimizerPlugin(),
    ],
  },
};
module.exports = commonConfig;
/* (env, argv) => {
  const config = require(
    `./tools/webpack.${env.WEBPACK_SERVE ? "development" : argv.mode}`,
  );

  return merge(commonConfig, config);
}; */
