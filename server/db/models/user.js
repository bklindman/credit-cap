var mongoose = require('mongoose');
const {Account} = require('./account');


var UserSchema = new mongoose.Schema({
  tokens: {
    type: [String]
  },
  linked: {
    type: Boolean,
    default: false
  }
}, {discriminatorKey: 'role'});

var User = Account.discriminator('user', UserSchema);


module.exports = {
  User
}