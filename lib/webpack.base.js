const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");
const process = require("process");
const path = require("path");
const glob = require("glob");

// 定位文件路径
const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.resolve(projectRoot, "src/*/index.js"));
  entryFiles.map((file) => {
    const match = file.match(/\/src\/(.*)\/index.js/);
    const pageName = match && match[1];
    entry[pageName] = file;
    return htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `src/${pageName}/index.html`),
        filename: `${pageName}.html`, // 输出文件名
        chunks: [pageName],
        // eslint-disable-next-line comma-dangle
      })
    );
  });
  return { entry, htmlWebpackPlugins };
};

// 多页面入口 & 多页面打包
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    filename: "[name]_[chunkhash:8].js", // 使用占位符
    path: path.resolve(projectRoot, "dist"),
    assetModuleFilename: "static/[hash][ext][query]",
  },
  module: {
    // 资源解析、样式增强
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      options: {
                        browserslist: {
                          production: [">0.2%", "not dead", "not op_mini all"],
                          development: [
                            "last 1 chrome version",
                            "last 1 firefox version",
                            "last 1 safari version",
                            "last 1 ie version",
                          ],
                        },
                      },
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // CSS 提取成一个单独的文件
    new MiniCssExtractPlugin({
      filename: "[name][contenthash:hash].css",
    }),
    // 目录清理
    new CleanWebpackPlugin(),
    // 命令行信息显示优化
    new FriendlyErrorsWebpackPlugin(),
    // 错误捕获和处理
    function errorPlugin() {
      // this -> compiler
      this.hooks.done.tap("done", (stats) => {
        if (
          stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf("--watch") === -1
        ) {
          Error("build error!");
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugins),
};
