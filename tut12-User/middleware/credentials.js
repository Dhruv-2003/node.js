const allowedOrigns = require("../conifg/allowedOrigns");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigns.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
