const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const postRoutes = require("./routes/post-routes");
const userRoutes = require("./routes/user-routes");
const mongoose = require("mongoose");
const HttpError = require("./models/HttpError");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/posts", postRoutes);
app.use("/auth", userRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred." });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log("Error connecting to DB");
  });
