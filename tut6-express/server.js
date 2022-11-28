const express = require("express");

/// app is created similar to as a server
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

/// if it is / or /index.html or /index with optional
app.get("^/$|/index(.html)?", (req, res) => {
  // res.send("Hello world !");

  // sending a specific file for the request with path
  // res.sendFile("./views/index.html", { root: __dirname });

  // path join method
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "./new-page.html"); /// 302 by default
});

app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
    /// functions are chained together
    ///  next is used to chain them together
  },
  (req, res) => {
    res.send("Hello World ");
  }
);

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));

  // 404 will not be sent , send custom status 404
});

/// route Handlers --- the req and res handler anon functions are the route handlers

/// . listening the app on the PORT
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
