"use strict";
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
var privateKEY = fs.readFileSync(
  path.join(__dirname, "/../../config/env/private.key"),
  "utf8"
);
var publicKEY = fs.readFileSync(
  path.join(__dirname, "/../../config/env/public.key"),
  "utf8"
);
require("dotenv").config();

module.exports = {
  jwtSign: (payload) => {
    var Options = {
      issuer: process.env.JWT_ISSUER,
      subject: process.env.JWT_SUBJECT,
      audience: process.env.JWT_AUDIENCE,
      expiresIn: "12h",
      algorithm: "RS256",
    };
    var token = jwt.sign(payload, privateKEY, Options);
    return token;
  },

  jwtVerify: (token) => {
    var Options = {
      issuer: process.env.JWT_ISSUER,
      subject: process.env.JWT_SUBJECT,
      audience: process.env.JWT_AUDIENCE,
      expiresIn: "12h",
      algorithm: "RS256",
    };
    var legit = jwt.verify(token, publicKEY, Options);
    return legit;
  },
};
