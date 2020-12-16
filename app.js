const express = require("express");
const { initImg } = require("./utils/tools");
const app = express();
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(express.static("./public"));

app.post("/api/v1/jpr", (req, res) => {
  console.log(req.body);
  initImg(req.body.content, (filename) => {
    res.json({
      code: 1,
      info: "/" + filename,
    });
  });
});

app.listen(3000, () => console.log("服务器运行在3000端口"));
