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
  fs.readFile(__dirname + "/db/productInfo.json", "utf8", function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

app.post("/signup", (req, res) => {
  var existingUser = [];
  fs.readFile(__dirname + "/db/signup.json", "utf8", function (err, data) {
    if (err) throw err;
    existingUser = [...JSON.parse(data), req.body];
    var writer = fs.createWriteStream("./db/signup.json");
    writer.write(JSON.stringify(existingUser));
    res.send(existingUser);
  });
});

app.get("/login", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  fs.readFile(__dirname + "/db/signup.json", "utf8", function (err, data) {
    if (err) return err;
    const myDB = JSON.parse(data);
    let isValid = false;

    myDB.forEach((element) => {
      if (element.username === username && element.password === password) {
        isValid = true;
         res.send("login success");
         res.end();
      }
    });

     if (!isValid) {
       console.log(isValid,"isValid isValid");
       res.send("login fail");
       res.end();
     }
  });
});

app.listen(3001, () => {
  console.log("Server Started Sucess");
});
