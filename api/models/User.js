const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, unique: false, required: false },
  lastName: { type: String, unique: false, required: false },
  email: { type: String, unique: true, required: true },
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.statics.getUserInfo = async function (cacheKey, param, projection) {
  try {
    var result = await this.find(param, projection).cache({ key: cacheKey });
    return result;
  } catch (e) {
    throw e;
  } finally {
    //mongoose.connection.close();
  }
};

userSchema.statics.getUserByKey = async function (
  param,
  projection,
  isCached = false
) {
  try {
    if (!isCached) return await this.findOne(param, projection);
    else return await this.findOne(param, projection).cache({ key: "default" });
  } catch (e) {
    throw new Error(e);
  } finally {
    //mongoose.connection.close();
  }
};

userSchema.statics.insertUser = async function (param) {
  try {
    const result = await this.create(param);
    return result;
  } catch (e) {
    console.log(e);
    if (e.code == 11000) throw "duplicate user Email address or username";
  } finally {
    //mongoose.connection.close();
  }
};

userSchema.statics.updateUserInfo = async function (filter, update) {
  try {
    let doc = await this.findOneAndUpdate(filter, update);
    return doc;
  } catch (e) {
    throw new Error(e);
  } finally {
    //mongoose.connection.close();
  }
};

async function run() {
  await mongoose.connect(process.env.MONGO_URL);
  module.exports = mongoose.model("User", userSchema);
}

run();
