const { jwtSign, jwtVerify } = require("../services/jwtService");

module.exports = async function (req, res, next) {
  var userMdl = require("../models/User");
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    var access_token = req.headers.authorization.split(" ")[1];
    var result = jwtVerify(access_token);
    if (!result) {
      return res.Forbiden("Access denied", []);
    } else {
      const userInfo = await userMdl.getUserByKey(
        {
          access_token: access_token,
        },
        {},
        false
      );
      req.userId = userInfo.id;
      next();
    }
  } else {
    return res.Forbiden("Access denied", []);
  }
};
