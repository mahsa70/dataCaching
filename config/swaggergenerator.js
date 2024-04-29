module.exports["swagger-generator"] = {
  disabled: false,
  swaggerJsonPath: "./swagger/swagger.json",
  swagger: {
    openapi: "3.0.0",
    info: {
      title: "Read Data From Cache",
      description: "this is a sample Nodejs implemented with redis Cache ",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          in: "header",
          name: "Authorization",
          description: "Bearer Token",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        user: {
          description: "the user schema",
          properties: {
            firstName: { type: String, unique: false, required: false },
            lastName: { type: String, unique: false, required: false },
            email: {
              type: String,
              unique: true,
              required: true,
            },
            access_token: { type: String, required: true },
            refresh_token: { type: String, required: true },
            username: { type: String, unique: true, required: true },
            password: { type: String, required: true },
          },
        },
        blog: {
          description: "the blog schema",
          properties: {
            title: { type: String, unique: false, required: true },
            isActive: { type: Boolean, unique: false, required: true },
            userId: { type: Number, unique: false, required: true },
            descrption: { type: String, required: true },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [{ url: "http://localhost:1337/", description: "local server" }],
  },
  defaults: {
    responses: {
      200: { description: "The requested resource" },
      404: { description: "Resource not found" },
      500: { description: "Internal server error" },
    },
  },
  excludeDeprecatedPutBlueprintRoutes: true,
  includeRoute: function (routeInfo) {
    if (routeInfo.middlewareType == "ACTION") return true;
    else return false;
  },
  postProcess: function (specifications) {
    var schema = specifications.components?.schemas;
    var keyArrs = schema && Object.keys(schema);
    keyArrs.forEach((key) => {
      if (key.includes("without-required-constraint")) {
        delete schema[key];
      }
    });
  },
};
