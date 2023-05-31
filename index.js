const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const fs = require("fs");

const handlers = require("./handlers");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/public", express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.use(bodyParser.text());

app.get("/", (req, res) => {
  res.send("server running success");
});

app.get("/form", handlers.handleGetMethod);
app.get("/users/:username", handlers.handleUser);

app.get("/product/:productId", handlers.handleProduct);

app.get("/products/categories", handlers.handleCategories);

app.get("/updatecolor", handlers.updatecolor);

app.post("/createProduct", handlers.createProduct);

app.get("/getAllProducts", handlers.getAllProducts);

app.get("/getProductById/:pId", handlers.getProductById);

app.get("/download", function (req, res) {
  const file = `${__dirname}/videos/sample.mp4`;
  res.download(file);
  res.statusCode = 200;
  res.end("file download success");
});

app.get("/myfile", (req, res) => {
  fs.readFile(__dirname + "/productInfo.json", "utf8", function (err, data) {
    if (err) throw err;
    console.log(data,"data data");
    res.send(data);
  });
});

app.listen(3001, () => {
  console.log("Server Started Sucess");
});
