import express = require("express");
import mongoose = require("mongoose");
import cors = require("cors");
require("dotenv/config");

// Create a new express application instance
const app: express.Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  res.send("hello world!");
});

app.get("/ping", function (req, res) {
  res.send("pong");
});

// Connect to DB
const db: mongoose.Connection = mongoose.connection;
db.on("error", (error) => console.error(error));
db.on("disconnected", () => console.log("Database Disconnected"));
db.once("open", () => console.log("Connected to Database"));

const dbURL: string = process.env.DB_CONNECTION!;

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
