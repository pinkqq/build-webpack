if (typeof self === "undefined") {
  global.self = {};
}

const fs = require("fs");
const path = require("path");
const express = require("express");
const { renderToString } = require("react-dom/server");
const SSR = require("../dist/Hello-server"); // 引入组件，文件名-server
const template = fs.readFileSync(
  path.join(__dirname, "../dist/Hello.html"),
  "utf-8"
);
const data = require("./data.json");

//  创建一个服务
const server = (port) => {
  const app = express();

  // 设置静态目录
  app.use(express.static("dist"));

  // 设置路由
  app.get("/hello", (req, res) => {
    console.log("/hello");
    const html = renderMarkup(renderToString(SSR));
    res.status(200).send(html);
  });

  // 监听端口
  app.listen(port, () => {
    console.log("Server is running on port: " + port);
  });
};

// 端口默认为 3000
server(process.env.PORT || 3000);

// html 模版
const renderMarkup = (html) => {
  const dataStr = JSON.stringify(data);
  return template
    .replace("<!-- HTML_PLACEHOLDER -->", html)
    .replace(
      "<!--INITIAL_DATA_PLACEHOLDER-->",
      `<script>window.__initial_data_placeholder=${dataStr}</script>`
    );
};
