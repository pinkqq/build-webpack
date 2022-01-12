const { describe, it } = require("mocha");
const assert = require("assert");
const baseConfig = require("../../lib/webpack.base");

describe("webpack.base.js test case", () => {
  // 测试定义
  it("entry", () => {
    assert(
      baseConfig.entry.pageOne,
      "/Users/xqq/workspace/qq/code/geekUniversity/Webpack/code/my-project/builder-webpack/test/smoke/template/src/pageOne/index.js"
    );
    assert(
      baseConfig.entry.pageTwo,
      "/Users/xqq/workspace/qq/code/geekUniversity/Webpack/code/my-project/builder-webpack/test/smoke/template/src/pageTwo/index.js"
    );
  });
});
