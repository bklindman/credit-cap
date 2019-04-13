var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

var AccountSchema = new mongoose.Schema({
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
  }
}, {discriminatorKey: 'role'});


AccountSchema.statics.validPassword = function(password){
  let regex = /^[\w!@#$]+$/;
  if(!password.match(regex) || password.length < 8){
    return false;
  }
  return true;
}

AccountSchema.statics.findByCredentials = function(username, password, role) {
  var Account = this;
  return Account.findOne({username, role}).then((account) => {
    if(!account){
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, account.password, (err, res) => {
        if(res){
          return resolve(account);
        }
        return reject('Invalid username/password.');
      });
    });
  })
}

AccountSchema.methods.generateToken = function() {
  let account = this;
  let token = jwt.sign({id: account._id.toHexString(), username: account.username, role: account.role}, secret, {expiresIn: 60 * 30} );
  return token;
}

AccountSchema.pre('save', function(next) {
  var account = this;
  if (account.isModified('password')){
    bcrypt.genSalt(10, (err, salt) =>{
      bcrypt.hash(account.password, salt, (err, hash) => {
        account.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var Account = mongoose.model('Account', AccountSchema);

module.exports = {
  Account
}