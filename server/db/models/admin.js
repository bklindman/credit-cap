var mongoose = require('mongoose');
const {User} = require('./user');

var AdminSchema = new mongoose.Schema({}, {discriminatorKey: 'role'});

var Admin = User.discriminator('admin', AdminSchema);

module.exports = {
  Admin
}