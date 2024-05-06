/**
 * BlogController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var userMdl = require("../models/User");
var blogMdl = require("../models/Blog");

module.exports = {
  createBlog: async (req, res) => {
    const { title, descrption } = req.body;
    var userId = req.userId;
    console.log("userId", userId);
    const result = await blogMdl.createBlog({
      title: title,
      descrption: descrption,
      userId: userId,
      isActive: 1,
    });
    return res.Ok("OK", result);
  },

  getAllBlogs: async (req, res) => {
    var userId = req.userId;
    var blogs = await blogMdl.getAllUserBlogs(userId, { userId: userId }, {});
    return res.Ok("OK", blogs);
  },
};
