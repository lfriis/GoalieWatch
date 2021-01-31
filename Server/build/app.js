"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
require("dotenv/config");
// Create a new express application instance
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", function (req, res) {
    res.send("hello world!");
});
app.get("/ping", function (req, res) {
    res.send("pong");
});
// Connect to DB
var db = mongoose.connection;
db.on("error", function (error) { return console.error(error); });
db.on("disconnected", function () { return console.log("Database disconnected"); });
db.once("open", function () { return console.log("Connected to Database"); });
var dbURL = process.env.DB_CONNECTION;
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () { return "Server running on port " + PORT; });
