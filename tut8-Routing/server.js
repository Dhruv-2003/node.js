const express = require("express");

/// app is created similar to as a server
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const { logEvents, logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

//--> built in middleware
/// to handle URL encoded form data is submitted
app.use(express.urlencoded({ extended: false }));

/// to handle for JSON
app.use(express.json());

// to serve static
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/subdir", express.static(path.join(__dirname, "/public")));

/// ROUTING
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

//--> custom middleware logger
app.use(logger);

//--> third party middleware

const whitelist = [
  "https://www.yoursite.com",
  "https://127.0.0.1.5500",
  "https://localhost:3500",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by cors"));
    }
  },
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
///Cross origin resource Sharing

/// all is for avery type of request
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found JSON" });
  } else {
    res.type("txt").send({ error: "404 Not found txt" });
  }

  // 404 will not be sent , send custom status 404
});

/// route Handlers --- the req and res handler anon functions are the route handlers

app.use(errorHandler);
/// . listening the app on the PORT
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
