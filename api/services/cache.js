const mongoose = require("mongoose");
const {
  setValue,
  getValue,
  setMValue,
  getMValue,
} = require("./redisConnection");

require("dotenv").config();
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = async function (option) {
  this._useCache = true;
  this._key = option.key ? option.key : "defalut";
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (this._useCache) {
    var query = this.getQuery();
    var collectionName = { collectionName: this.mongooseCollection.name };
    var cacheKey = Object.assign({}, query, collectionName);
    // ##### get key from cache #####
    const redisValue = await getMValue(this._key, JSON.stringify(cacheKey));
    if (redisValue) {
      console.log(">>>>> read from Redis <<<<< ");
      const doc = JSON.parse(redisValue);
      return Array.isArray(doc)
        ? doc.map((d) => new this.model(d))
        : new this.model(doc);
    } else {
      console.log(">>>>> read from MongoDB <<<<< ");
      const result = await exec.apply(this, arguments);
      // ##### set the result in Redis  #####
      await setMValue(
        this._key,
        JSON.stringify(cacheKey),
        JSON.stringify(result)
      );

      return result;
    }
  } else {
    const result = await exec.apply(this, arguments);
    return result;
  }
};
