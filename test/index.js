const { describe } = require("mocha");
const path = require("path");

// 进入 template
process.chdir(path.join(__dirname, "smoke/template"));

describe("builder-webpack test case", () => {
  require("./unit/webpack-base-test");
  require("./unit/webpack-dev-test");
  require("./unit/webpack-prod-test");
  require("./unit/webpack-ssr-test");
});
