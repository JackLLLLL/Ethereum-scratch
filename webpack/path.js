const path = require("path");

module.exports = {
  cilentJs: path.resolve(__dirname, "../client/app.js"),
  cilentDist: path.resolve(__dirname, "../public"),
  srcPath: path.resolve(__dirname, "../client"),
  staticPath: path.resolve(__dirname, "../static")
};