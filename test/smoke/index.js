const path = require("path");
const webpack = require("webpack");
const rimraf = require("rimraf");
const Mocha = require("mocha");

const mocha = new Mocha({ timeout: "10s" });
const prodConfig = require("../../lib/webpack.prod");

// 进入template环境
process.chdir(path.join(__dirname, "template"));

// 删除 dist
rimraf("./dist", () => {
  // 通过 webpack 函数，运行配置
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err);
      process.exit(2);
    }
    console.log(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
      })
    );

    console.log("webpack build success, begin run testing");

    mocha.addFile(path.join(__dirname, "css-js-test.js"));
    mocha.addFile(path.join(__dirname, "html-test.js"));
    mocha.run();
  });
});
