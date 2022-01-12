const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

const devConfig = { mode: "development" };

module.exports = merge(baseConfig, devConfig);
