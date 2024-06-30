module.exports = {
  syntax: "postcss-scss",
  plugins: [
    require("postcss-import"),
    require("postcss-advanced-variables"),
    require("postcss-nested"),
    require("postcss-utilities")({ centerMethod: "flexbox" }),
    require("postcss-short"),
    // require("postcss-sass-color-functions"),
    require("postcss-map-get"),
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
