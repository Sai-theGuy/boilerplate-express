let express = require("express");
let app = express();
require("dotenv").config();
let bodyParser = require("body-parser");

console.log("Hello World");
console.log(__dirname);

// app.get("/", function(req, res) {
//   res.send("Hello Express");
// })

app.use((request, response, next) => {
  console.log(request.method + " " + request.path + " - " + request.ip);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/json", (request, response) => {
  let messages = {};
  if (process.env.MESSAGE_STYLE == "uppercase") {
    messages = {
      message: "HELLO JSON",
    };
  } else if (process.env.MESSAGE_STYLE == "lowercase") {
    messages = {
      message: "hello json",
    };
  } else {
    messages = {
      message: "Hello json",
    };
  }
  response.json(messages);
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get(
  "/now",
  (request, response, next) => {
    request.time = new Date().toString();
    next();
  },
  (request, response) => {
    let time = {
      time: request.time,
    };
    response.json(time);
  }
);

app.get("/:word/echo", (request, response) => {
  let word = { echo: request.params.word };
  response.json(word);
});

app
  .route("/name")
  .get((request, response) => {
    let name = { name: request.query.first + " " + request.query.last };
    response.json(name);
  })
  .post((request, response) => {
    let name = { name: request.body.first + " " + request.body.last };
    response.json(name);
  });

module.exports = app;
