const glob = require("glob-all");
const { describe, it } = require("mocha");

describe("Checking generated css js file", () => {
  it("should generate css js files", (done) => {
    const files = glob.sync([
      "./dist/pageOne_*.css",
      "./dist/pageOne_*.js",
      "./dist/pageTwo_*.css",
      "./dist/pageTwo_*.js",
    ]);
    if (files.length > 0) {
      done();
    } else {
      throw new Error("no css js file generated");
    }
  });
});
