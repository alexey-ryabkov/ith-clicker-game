const path = require("path");
// const { merge } = require("webpack-merge");
const pug = require("pug");
const PugPlugin = require("pug-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const pages = require("./src/pages");

const srcPath = path.resolve(__dirname, "./src");
const entryParams = {
  filename: "[name]/index.html",
  data: {
    pug,
    srcPath,
    render: (path, options = {}) =>
      pug.renderFile(`${srcPath}/${path}`, options),
    pages,
  },
};
const entry = pages.reduce((result, page) => {
  const { name } = page;
  let { filename, data } = entryParams;
  name === "main" && (filename = "index.html");
  result[name] = {
    import: `./src/pages/${name}/index.pug`,
    filename,
    data,
  };
  return result;
}, {});

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
      entry,
      js: {
        filename: ({ chunk: { name } }) =>
          name !== "main" ? "[name]/scripts.js" : "scripts.js",
      },
      css: {
        filename: ({ chunk: { name } }) =>
          name !== "main" ? "[name]/styles.css" : "styles.css",
      },
      minify: false,
    }),
  ],
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({ extractComments: false }),
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
