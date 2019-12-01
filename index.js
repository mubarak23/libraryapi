const express = require("express");
const mongoes = require("mongoose");
const bodyParser = require("body-parser");
const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
if (process.env.Dev === "test") {
  const db = mongoes.connect(
    "mongodb://root:root123@ds251240.mlab.com:23088/demodata",
    { useNewUrlParser: true },
    error => {
      if (error) {
        console.log("internal server error with test mlab ");
      } else {
        console.log("Mongooes is connected to mlab DB");
      }
    }
  );
} else {
  const db = mongoes.connect(
    "mongodb://root:root123@ds251240.mlab.com:51240/nodehome",
    { useNewUrlParser: true },
    error => {
      if (error) {
        console.log("internal server error with mlab ");
      } else {
        console.log("Mongooes is connected to mlab DB");
      }
    }
  );
}

//const bookRouter = express.Router();
var port = process.env.PORT || 3000;

//wiring the book router to our app
app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to library resfull api");
});

app.server = app.listen(port, () => {
  console.log("Running on port " + port);
});

module.exports = app;
