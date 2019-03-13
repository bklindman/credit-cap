var mongoose = require('mongoose');
const {RewardBatchSchema} = require('./reward');

var CreditCardSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  bonus: {
    type: Number,
    default: 0,
    min: 0
  },
  fee: {
    type: Number,
    default: 0,
    min: 0
  },
  point_system: {
    base: {
      type: Number,
      required: true,
      min:0
    },
    rewards: RewardBatchSchema.path('rewards')
  }
});

var CreditCard = mongoose.model('CreditCard', CreditCardSchema);


module.exports = {
  CreditCard
}