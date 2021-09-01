// const compression = require('compression')
require('newrelic');
const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
// app.use(compression())

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())

const router = require("./routes");
router(app, "/news/api");

app.get("*", (req, res) => {
  res.send("Not Found!");
});

app.listen(port, () => {
  console.log(
    `app listening at http://${process.env.HOST || "localhost"}:${port}`
  );
});

module.exports = app
