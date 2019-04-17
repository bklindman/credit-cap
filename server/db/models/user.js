var mongoose = require('mongoose');
const {Account} = require('./account');


var ItemSchema = new mongoose.Schema({
  item_id: {
    type: String,
    required: true
  },
  access_token: {
    type: String,
    required: true
  }
}, {_id: false});

var UserSchema = new mongoose.Schema({
  items: [ItemSchema],
  linked: {
    type: Boolean,
    default: false
  }
}, {discriminatorKey: 'role'});

var User = Account.discriminator('user', UserSchema);


module.exports = {
  User
}