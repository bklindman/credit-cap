var mongoose = require('mongoose');
const {Account} = require('./account');


var ItemSchema = new mongoose.Schema({
  institution_name: {
    type: String,
    required: true
  },
  item_id: {
    type: String,
    required: true
  },
  access_token: {
    type: String,
    required: true
  },
  accounts: {
    type: [String],
    required: true,
    default: []
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