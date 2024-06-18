module.exports = {
  syntax: "postcss-scss",
  plugins: [
    require("postcss-import"),
    require("postcss-advanced-variables"),
    require("postcss-nested"),
    require("postcss-utilities"),
    require("postcss-short"),
    require("postcss-preset-env")({
      features: {
        "nesting-rules": false,
        "media-query-ranges": true,
        "custom-media-queries": true,
      },
    }),
    require("autoprefixer"),
  ],
};
