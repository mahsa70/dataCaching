/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */
module.exports.policies = {
  UserController: {
    // Apply the 'isLoggedIn' policy to the 'update' action of 'UserController'
    allUsser: "auth",
    getUserByUsername: "auth",
  },
  BlogController: {
    createBlog: ["auth", "clearCache"],
    getAllBlogs: ["auth"],
  },
};
