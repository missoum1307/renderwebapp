const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send(req.query.input);
});

app.listen(3000);
