// this is a backend node module

const jwt = require('jsonwebtoken');

// middleware authorization function
module.exports = function(req, res, next) {
    // Check if the token is in the header or in the query section of the url
    let token = req.get('Authorization') || req.query.token;
    // Default to null there is no token
    req.user = null;
    // continue if no token is found
    if (!token) return next();
    // Remove the 'Bearer ' that was included in the token header
    token = token.replace('Bearer ', '');
    // Check if token is valid and not expired
    // 'decoded' parameter is the payload of the json
    jwt.verify(token, process.env.SECRET, function(err, decoded) { 
      // Invalid token if err
      if (err) return next();
      // decoded is the entire token payload
      req.user = decoded.user;
      // If interested in the expiration,
      // and we just happen to be...
      req.exp = new Date(decoded.exp * 1000); // remember this is converting exp(expiration) which is in seconds, into milliseconds so it is compatible with Date()
      return next();
    });
  };