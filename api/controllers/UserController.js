var userMdl = require("../models/User");
var cacheServie = require("../services/cache");
const { v4: uuidv4 } = require("uuid");
const { jwtSign, jwtVerify } = require("../services/jwtService");
const bcrypt = require("bcrypt");

module.exports = {
  allUsser: async (req, res) => {
    var response = await userMdl.getUserInfo("default", {}, {});
    return res.Ok("OK", response);
  },

  getUserByUsername: async (req, res) => {
    try {
      const { username } = req.query.username;
      console.log("username", username);
      var userInfo = await userMdl.getUserByKey(
        { username: username },
        { password: -1 },
        (isCached = false)
      );
      if (userInfo) return res.Ok("OK", userInfo);
      else return res.NotFound("data not found ", []);
    } catch (e) {
      return res.InternalError("Error", {
        success: false,
        error: { message: e },
        data: [],
      });
    } finally {
    }
  },

  signup: async (req, res) => {
    try {
      const { firstName, lastName, email, username, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const userObj = Object.assign(
        { password: hash, access_token: " ", refresh_token: " " },
        { firstName, lastName, email, username }
      );
      const result = await userMdl.insertUser(userObj);
      return res.Created("the record is created", result);
    } catch (e) {
      return res.Conflict("duplicated record", {
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
        var accessToken = jwtSign(
          {
            email: email,
            username: userInfo.username,
          },
          0
        );
        var refreshToken = jwtSign({ email: email }, 1);
        var updatedDoc = await userMdl.updateUserInfo(
          { email: email },
          {
            access_token: accessToken,
            refresh_token: refreshToken,
          }
        );
        return res.Ok("OK", {
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      } else {
        res.status(400).send([]);
      }
    } catch (e) {
      return res.InternalError("Error", {
        success: false,
        error: { message: e },
        data: [],
      });
    } finally {
    }
  },

  newRefreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      // Verifying refresh token
      var result = jwtVerify(refreshToken, 1);
      if (!result) {
        return res.Forbiden("Unauthorized", []);
      } else {
        const userInfo = await userMdl.getUserByKey({
          refresh_token: refreshToken,
        });
        if (userInfo) {
          var accessToken = jwtSign(
            {
              email: userInfo.email,
              username: userInfo.username,
            },
            1
          );
          var newRefreshToken = jwtSign({ email: userInfo.email }, 1);
          var updatedDoc = await userMdl.updateUserInfo(
            { email: userInfo.email },
            {
              access_token: accessToken,
              refresh_token: newRefreshToken,
            }
          );
          return res.Ok("OK", {
            access_token: accessToken,
            refresh_token: refreshToken,
          });
        } else {
          return res.Forbiden("Unauthorized", []);
        }
      }
    } catch (e) {
      return res.InternalError("Error", {
        success: false,
        error: { message: e },
        data: [],
      });
    } finally {
    }
  },
};
