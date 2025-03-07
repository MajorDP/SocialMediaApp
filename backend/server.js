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

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(new HttpError("Session expired.", 422));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return next(new HttpError("Session expired invalid.", 422));
    }

    req.user = user;
    next();
  });
};

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
