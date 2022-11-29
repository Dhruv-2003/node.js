const express = require("express");
const router = express.Router();

const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  // res.send("Hello world !");

  // sending a specific file for the request with path
  // res.sendFile("./views/index.html", { root: __dirname });

  // path join method
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
