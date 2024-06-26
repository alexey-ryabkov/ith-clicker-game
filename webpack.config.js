const path = require("path");
// const { merge } = require("webpack-merge");
const pug = require("pug");
const PugPlugin = require("pug-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const pages = require("./src/pages");
const jsConfig = require("./jsconfig.json");

const srcPath = path.resolve(__dirname, "./src");
/**
 * @typedef {{
 *   import: string,
 *   filename: string,
 *   data: Object
 * }} EntryParams
 */
/** @type EntryParams **/
const entryParams = {
  import: "",
  filename: "[name]/index.html",
  data: {
    pathResolve: (/** @type {string} */ sPath) => path.resolve(srcPath, sPath),
    renderTmpl: (/** @type {string} */ path, options = {}) =>
      pug.renderFile(`${srcPath}/${path}`, options),
    render: (/** @type {string} */ tmpl, options = {}) =>
      pug.render(tmpl, options),
    pages,
    log: (/** @type {string} */ msg) => console.log(msg),
  },
};
/** @type EntryParams[] **/
const entry = pages.reduce(
  (/** @type {Object.<{string}, {Object}>} */ result, page) => {
    const { name } = page;
    let { filename, data } = entryParams;
    name === "main" && (filename = "index.html");
    result[name] = {
      import: `./src/pages/${name}/index.pug`,
      filename,
      data,
    };
    return result;
  },
  {},
);

const {
  compilerOptions: { paths: jsConfigAliases },
} = jsConfig;
const regAllChilds = /\/\*$/;
const alias = Object.entries(jsConfigAliases).reduce(
  (/** @type {Object.<{string}, {string}>} */ result, [alias, sPaths]) => {
    let sPath = /** @type {string} */ (sPaths.pop());
    if (regAllChilds.test(sPath)) {
      alias = alias.replace(regAllChilds, "");
      sPath = sPath.replace(regAllChilds, "");
    } else {
      sPath += "/index.js";
    }
    result[alias] = path.resolve(__dirname, `src/${sPath}`);
    return result;
  },
  {},
);

/** @typedef {{ chunk: { name: string } }} PugFileData **/
const commonConfig = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
  },
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
        filename: (/** @type {PugFileData} */ { chunk: { name } }) =>
          name !== "main" ? "[name]/scripts.js" : "scripts.js",
      },
      css: {
        filename: (/** @type {PugFileData} */ { chunk: { name } }) =>
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
    alias,
    // alias: {
    //   "@components": path.resolve(__dirname, "src/components"),
    //   "@lib": path.resolve(__dirname, "src/lib"),
    //   "@utils-kit": path.resolve(__dirname, "src/utils/index.js"),
    //   "@utils": path.resolve(__dirname, "src/utils"),
    //   "@app": path.resolve(__dirname, "src/app"),
    //   "@game": path.resolve(__dirname, "src/app/game"),
    // },
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
