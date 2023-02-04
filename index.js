const express = require("express");
const app = express();
var path = require("path");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/input", function (req, res) {
  res.send(req.query.input);
});

app.get("/google-accounts-xss.html", function (req, res) {
  res.sendFile(path.join(__dirname, "google-accounts-xss.html"));
});

app.get("/google-csrfs.html", function (req, res) {
  res.sendFile(path.join(__dirname, "google-csrfs.html"));
});

app.get("/googlebugs.html", function (req, res) {
  res.sendFile(path.join(__dirname, "googlebugs.html"));
});

app.listen(3003);
