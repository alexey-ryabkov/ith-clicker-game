const path = require("path");
const pug = require("pug");
const PugPlugin = require("pug-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { prettyDateTime } = require("./src/utils/index.js");
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
    renderTmpl: (/** @type {string} */ path, options = {}) =>
      pug.renderFile(`${srcPath}/${path}`, options),
    render: (/** @type {string} */ tmpl, options = {}) =>
      pug.render(tmpl, options),
    pages,
    utils: {
      pathResolve: (/** @type {string} */ sPath) =>
        path.resolve(srcPath, sPath),
      log: (/** @type {string} */ msg) => console.log(msg),
      prettyDateTime,
    },
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

/**
 * @typedef {{ chunk: { name: string } }} PugFileData
 */
// @ts-ignore
module.exports = ({ WEBPACK_SERVE }, /** @type Object */ argv) => {
  const mode = WEBPACK_SERVE
    ? "development"
    : "mode" in argv
      ? argv.mode
      : "production";
  const isDev = mode === "development";
  return {
    mode,
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
        minify: !isDev,
      }),
    ],
    optimization: {
      minimize: !isDev,
      minimizer: [
        new TerserPlugin({ extractComments: !isDev }),
        new CssMinimizerPlugin(),
      ],
    },
    resolve: {
      alias,
      extensions: [".pug", ".js", ".css", ".pcss", ".scss"],
    },
  };
};
