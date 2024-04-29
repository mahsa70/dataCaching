var userMdl = require("../models/User");
var cacheServie = require("../services/cache");
const { v4: uuidv4 } = require("uuid");
const { jwtSign } = require("../services/jwtService");
const bcrypt = require("bcrypt");

module.exports = {
  allUsser: async (req, res) => {
    var userId = req.userId;
    var response = await userMdl.getUserInfo((cacheKey = "default"), {}, {});
    return res.json(response);
  },

  getUserByUsername: async (req, res) => {
    var username = req.body;
    var userInfo = await userMdl.getUserByKey(
      { username: username },
      { password: -1 },
      (isCached = true)
    );
    if (userInfo) return res.Ok("OK", userInfo);
    else return res.NotFound("data not found  ", []);
  },

  signup: async (req, res) => {
    try {
      const { firstName, lastName, email, username, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const userObj = Object.assign(
        { password: hash, access_token: " ", refresh_token: " " },
        { firstName, lastName, email, username }
      );
      console.log("userObj", userObj);
      const result = await userMdl.insertUser(userObj);
      console.log("result", result);
      return res.status(201).send(result);
    } catch (e) {
      return res.status(409).send({
        success: false,
        error: { message: e },
        data: [],
      });
    } finally {
    }
  },

  signin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const userInfo = await userMdl.getUserByKey({ email: email });
      if (userInfo) {
        delete userInfo.password;
        var accessToken = jwtSign({ email: email });
        var refreshToken = uuidv4();
        var updatedDoc = await userMdl.updateUserInfo(
          { email: email },
          {
            access_token: accessToken,
            refresh_token: refreshToken,
          }
        );
        return res.status(200).send({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      } else {
        res.status(400).send([]);
      }
    } catch (e) {
      console.log("signin Error", e);
    } finally {
    }
  },
};
