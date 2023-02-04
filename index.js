const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send(req.query.input);
});

app.get("/google-accounts-xss.html", function (req, res) {
  res.sendFile("google-accounts-xss.html");
});

app.get("/google-csrfs.html", function (req, res) {
  res.sendFile("google-csrfs.html");
});

app.get("/googlebugs.html", function (req, res) {
  res.sendFile("googlebugs.html");
});

app.listen(3000);
