const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema({
  title: { type: String, unique: false, required: true },
  isActive: { type: Boolean, unique: false, required: true },
  userId: { type: String, unique: false, required: true },
  descrption: { type: String, required: true },
});

blogSchema.statics.getAllUserBlogs = async function (
  cacheKey,
  param,
  projection
) {
  try {
    var result = await this.find(param, projection).cache({ key: cacheKey });
    return result;
  } catch (e) {
    throw e;
  } finally {
    //mongoose.connection.close();
  }
};

blogSchema.statics.createBlog = async function (param) {
  try {
    const result = await this.create(param);
    return result;
  } catch (e) {
    throw e;
  } finally {
    //mongoose.connection.close();
  }
};

async function run() {
  await mongoose.connect(process.env.MONGO_URL);
  module.exports = mongoose.model("Blog", blogSchema);
}

run();
