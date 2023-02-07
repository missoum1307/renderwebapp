const express = require("express");
const app = express();
var path = require("path");

app.get("/redirect", function (req, res) {
  res.set("Location", req.query.url);
  res.send("Redirect...");
});

app.get("/xssme", function (req, res) {
  res.sendFile(path.join(__dirname, "xss.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tensor.bytes", function (req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.send(req.query.input);
});

app.get("/tsv", function (req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-type", "text/tab-separated-values");
  res.send(`-'alert(1)-'ter	Other parameter	Last parameter
  <-'alert(1)-'>	123456	12.45`);
});

app.get("/test", function (req, res) {
  const headers = JSON.parse(req.query.header);
  for (const header in headers) {
    res.set(header, headers[header]);
  }

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
