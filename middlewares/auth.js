const Models = require("../models");

var apiKeyAuthVerify = async function (req, res, next) {
    let resBody = { success: false },
    reqBody = req.body,    
    apiKeyHead = req.header("X-Api-Key") || reqBody.api_key;
    if (!apiKeyHead) {
      // API Key header not sent
      resBody.message = "API Key authentication header required";
      return res.status(401).json(resBody); // Terminate
    }
    let user = await Models.Organizations.aggregate(
      [ 
        {$match : {api_key :  apiKeyHead}},
        {$group: {_id:{ api_key : "$api_key", usertype : "$usertype",_id: "$_id" } }}
      ]
    ) 
    if (!user[0]) {
      // No user found means invalid API Key provided
      resBody.message = "Invalid API Key authentication header provided";
      return res.status(401).json(resBody); // Terminate
    }
    try {
      res.user = user;
      await next(); // Calling the next middleware
    } catch (err) {
      resBody.message = "Internal Server Error, Please try again";
      res.body = resBody;
    }
}
module.exports = {
  apiKeyAuth: apiKeyAuthVerify,
};