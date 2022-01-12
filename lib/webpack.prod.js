const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const baseConfig = require("./webpack.base");

const prodConfig = {
  mode: "production",
  optimization: {
    // 压缩代码
    minimizer: ["...", new CssMinimizerPlugin()],
    // 分离基础库
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
