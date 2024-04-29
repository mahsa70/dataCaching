/**
 * api/responses/data.js
 *
 * This will be available in controllers as res.data('foo');
 */

module.exports = function(message, data ) {

    var req = this.req;
    var res = this.res;
  
    var viewFilePath = 'mySpecialView';
    var statusCode = 404;
  
    var result = {
      status: statusCode
    };
  
    // Optional message
    if (message) {
      result.message = message;
    } else {
        result.message = 'OK'
    }

    if (data) {
        result.data = data;
    } else {
        result.data = {}
    }
  
    // If the user-agent wants a JSON response, send json
    if (req.wantsJSON) {
      return  res.status(result.status).json(result)
    }
  
    // Set status code and view locals
    res.status(result.status);
    for (var key in result) {
      res.locals[key] = result[key];
    }
    // And render view
    res.render(viewFilePath, result, function(err) {
      // If the view doesn't exist, or an error occured, send json
      if (err) {
        return  res.status(result.status).json(result)
      }
  
      // Otherwise, serve the `views/mySpecialView.*` page
      res.render(viewFilePath);
    });
  }