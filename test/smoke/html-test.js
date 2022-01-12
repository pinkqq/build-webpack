const glob = require("glob-all");
const { describe, it } = require("mocha");

describe("Checking generated html file", () => {
  it("should generate html files", (done) => {
    const files = glob.sync(["./dist/pageOne.html", "./dist/pageTwo.html"]);
    if (files.length > 0) {
      done();
    } else {
      throw new Error("no html file generated");
    }
  });
});
