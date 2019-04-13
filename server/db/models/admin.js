var mongoose = require('mongoose');
const {Account} = require('./account');

var AdminSchema = new mongoose.Schema({}, {discriminatorKey: 'role'});

var Admin = Account.discriminator('admin', AdminSchema);

module.exports = {
  Admin
}