/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
module.exports.routes = {
  "GET /api/v1/user/all": {
    controller: "UserController",
    action: "allUsser",
    swagger: {
      summary: "get all users",
      description: "get all users",
      tags: ["User"],
      responses: {
        200: {
          description: "The requested resource",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/user" },
              },
            },
          },
        },
        404: { description: "Resource not found" },
        500: { description: "Internal server error" },
      },
    },
  },

  "GET /api/v1/user/getByUsername": {
    controller: "UserController",
    action: "getUserByUsername",
    swagger: {
      summary: "getByUsername",
      description: "getByUsername",
      tags: ["User"],
      parameters: [
        {
          in: "query",
          name: "username",
          required: true,
          schema: { type: "string" },
          description: "username",
        },
      ],
      responses: {
        200: {
          description: "The requested resource",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/user" },
              },
            },
          },
        },
        404: { description: "Resource not found" },
        500: { description: "Internal server error" },
      },
    },
  },

  "POST /api/v1/user/signup": {
    controller: "UserController",
    action: "signup",
    swagger: {
      summary: "signup  a user",
      description: "signup a user",
      tags: ["User"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              properties: {
                email: { type: "string" },
                username: { type: "string" },
                firstName: { type: "string" },
                lastName: { type: "string" },
                password: { type: "string", format: "password" },
              },
              required: [
                "email",
                "username",
                "firstName",
                "lastName",
                "password",
              ],
            },
          },
        },
      },
      responses: {
        200: {
          description: "The requested resource",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/user" },
              },
            },
          },
        },
      },
    },
  },

  "POST /api/v1/user/signin": {
    controller: "UserController",
    action: "signin",
    swagger: {
      summary: "signin the user",
      description: "signin the user",
      tags: ["User"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              properties: {
                email: { type: "string" },
                password: { type: "string", format: "password" },
              },
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "The requested resource",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/user" },
              },
            },
          },
        },
        404: { description: "Resource not found" },
        500: { description: "Internal server error" },
      },
    },
  },

  "POST /api/v1/auth/refreshToken": {
    controller: "UserController",
    action: "newRefreshToken",
    swagger: {
      summary: "Authentication",
      description: "generate a new refresh token",
      tags: ["Auth"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              properties: {
                refreshToken: { type: "string" },
              },
              required: ["refreshToken"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "The requested resource",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/user" },
              },
            },
          },
        },
        404: { description: "Resource not found" },
        500: { description: "Internal server error" },
      },
    },
  },

  "POST /api/v1/blog/create": {
    controller: "BlogController",
    action: "createBlog",
    swagger: {
      summary: "create a blog by user",
      description: "this api is used for creating a blog",
      tags: ["Blog"],
      parameters: [
        {
          name: "access_token",
          in: "header",
          required: true,
          description: "access token",
          schema: {
            access_token: { type: "string" },
          },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              properties: {
                title: { type: String, unique: false, required: true },
                isActive: { type: Boolean, unique: false, required: true },
                userId: { type: Number, unique: false, required: true },
                descrption: { type: String, required: true },
              },
              required: ["title", "descrption", "isActive", "userId"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "The requested resource",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/blog" },
              },
            },
          },
        },
        404: { description: "Resource not found" },
        500: { description: "Internal server error" },
      },
    },
  },

  "GET /api/v1/blog/all": {
    controller: "BlogController",
    action: "getAllBlogs",
    swagger: {
      summary: "create a blog by user",
      description: "this api is used for creating a blog",
      tags: ["Blog"],
      parameters: [
        {
          name: "access_token",
          in: "header",
          required: true,
          description: "access token",
          schema: {
            access_token: { type: "string" },
          },
        },
      ],
      responses: {
        200: {
          description: "The requested resource",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/blog" },
              },
            },
          },
        },
        404: { description: "Resource not found" },
        500: { description: "Internal server error" },
      },
    },
  },

  "GET /swagger.json": (_, res) => {
    const swaggerJson = require("../swagger/swagger.json");
    if (!swaggerJson) {
      res.status(404).set("content-type", "application/json").send({
        message: "Cannot find swagger.json, has the server generated it?",
      });
    }
    return res
      .status(200)
      .set("content-type", "application/json")
      .send(swaggerJson);
  },
};
