var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    match: /^[a-zA-Z]*$/
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    lowercase: true,
    match: /^[a-zA-Z]+[\w]*$/
  },
  password: {
    type: String,
    required: true  
  },
  tokens: {
    type: [String]
  }
}, {discriminatorKey: 'role'});


UserSchema.statics.validPassword = function(password){
  let regex = /^[\w!@#$]+$/;
  if(!password.match(regex) || password.length < 8){
    return false;
  }
  return true;
}

UserSchema.statics.findByCredentials = function(username, password, role) {
  var User = this;
  return User.findOne({username, role}).then((user) => {
    if(!user){
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res){
          return resolve(user);
        }
        return reject('Invalid username/password.');
      });
    });
  })
}

UserSchema.methods.generateToken = function() {
  let user = this;
  let token = jwt.sign({id: user._id.toHexString(), username: user.username, role: user.role}, secret, {expiresIn: 60 * 30} );
  return token;
}

UserSchema.pre('save', function(next) {
  var user = this;
  if (user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) =>{
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model('user', UserSchema);


module.exports = {
  User
}