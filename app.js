const express = require("express");
const mongoose = require("mongoose");
const app = express();
const route = require("./routes/routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", route);

app.use((error, req, res, next) => {
  res.status(422).send({ error: error.message });
});

if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://localhost/muber");
}

module.exports = app;
