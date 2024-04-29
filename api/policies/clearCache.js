const { clearCache } = require("../services/redisConnection");

module.exports = async function (req, res, next) {
  next();
  console.log("clear cache ", req.userId);
  await clearCache(req.userId);
};
