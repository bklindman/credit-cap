const jwt = require('jsonwebtoken'); 
const secret = process.env.SECRET;

var auth = (req, res, next) => {
  var token = req.cookies['x-auth-token'];
  if(!token){
    return res.status(401).send({message: 'No token provided'});
  }
  jwt.verify(token, secret, function(err, decoded) {
    if(err) return res.status(400).send({message: 'Failed to authenticate token.'});
    req.userId = decoded.id;
    next();
  });
};


module.exports = {
  auth
}