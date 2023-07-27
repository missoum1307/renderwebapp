const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const writer = fs.createWriteStream("log.txt");


app.use(express.static("public"));

app.get("/fakeLoginMessenger", function (req, res) {
  res.sendFile(path.join(__dirname, "Messenger.html"));
});

app.get("/poc", function (req, res) {
  res.sendFile(path.join(__dirname, "poc.html"));
});



app.get("/blind", function (req, res) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = req.ip;
  writer.write(`x-forwarded-for:${forwarded}; ip: ${ip}`);
  res.send("Logged");
});

app.get("/log", function (req, res) {
  res.sendFile(path.join(__dirname, "log.txt"));
});

app.get("/ads.txt", function (req, res) {
  res.sendFile(path.join(__dirname, "ads.txt"));
});




app.get("/redirect", function (req, res) {
  res.redirect(req.query.url);
 
  
});

app.get("/xssme", function (req, res) {
  res.sendFile(path.join(__dirname, "xss.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tensor.bytes", function (req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.send(`
  <html>
  <head> <script>window.addEventListener("message", a=> console.log( '%c Caught event:', 'background: #222; color: #bada55', a))</script></head>
  <body style="background-color:white;">
${req.query.input}
</body></html>`);
});

app.get("/tsv", function (req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-type", "text/tab-separated-values");
  res.send(`-'alert(1)-'ter	Other parameter	Last parameter
  <-'alert(1)-'>	123456	12.45`);
});

app.get("/test", function (req, res) {
  const headers = req.query.header ? JSON.parse(req.query.header) : [] ;
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
