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
  fee: {
    type: Number,
    default: 0,
    min: 0
  },
  point_system: {
    base_rate: {
      type: Number,
      required: true,
      min: 0,
      max: 0.1
    },
    rewards: RewardBatchSchema.path('rewards'),
    bonus: {
      type: Number,
      default: 0,
      min: 0
    },
    unit: {
      type: String,
      enum: ['% Cashback', 'Points', 'Miles'],
      default: 'Points'
    }
  }
});

var CreditCard = mongoose.model('CreditCard', CreditCardSchema);


module.exports = {
  CreditCard
}