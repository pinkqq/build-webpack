function onClick() {
  import("./a.js")
    .then((module) => {
      const { text } = module.default;
      document.write(text);
      console.log(text);
      return module.default;
    })
    .catch(() => {
      // 如果加载 chunk 失败，我们可以 catch 它
      console.log("Chunk loading failed");
    });
}

console.log("click:", onClick());

// document.write("import()");
