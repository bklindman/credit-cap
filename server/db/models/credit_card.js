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
      amount: {
        type: Number,
        default: 0,
        min: 0
      },
      is_waived_1st_yr: {
        type: Boolean,
        default: false
      }
  },
  point_system: {
    base_rate: {
      type: Number,
      required: true,
      min: 0,
      max: 10
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
    },
    unit_to_dollar_ratio: {
      type: Number,
      default: .01
    }
  }
});

var CreditCard = mongoose.model('CreditCard', CreditCardSchema);


module.exports = {
  CreditCard
}