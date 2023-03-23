const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
const { spawn } = require("child_process");
var cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const initRoute = require("./routes/index");
app.use(cors({ credentials: true, origin: true }));
app.use("/public", express.static(path.join(__dirname, "./public")));

//connect db

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connection Success.");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

//middleware middle:
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//http logger
app.use(morgan("combined"));
const PORT = process.env.PORT || 3000;
//route init
initRoute(app);
app.get("/name", (req, res) => {
  let { PythonShell } = require("python-shell");
  var options = {
    args: [req.query.firstname, req.query.lastname],
  };
  PythonShell.run("process.py", options, function (err, data) {
    if (err) console.log(err);
    res.send(data.toString());
  });
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
