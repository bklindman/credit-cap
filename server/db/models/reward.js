var mongoose = require('mongoose');

var options = {discriminatorKey: 'kind', _id: false}

//Base Schema
var RewardSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  reward: {
    type: Number,
    required: true,
    min: 0,
    max: 0.1
  }
}, options);

var CategoryRewardSchema = new mongoose.Schema({
  category_id: {
    type: String,
    required: true
  }
}, options);

var MerchantRewardSchema = new mongoose.Schema({}, options);

var Reward = mongoose.model('Reward', RewardSchema);

var CategoryReward = Reward.discriminator('Category', CategoryRewardSchema);

var MerchantReward = Reward.discriminator('Merchant', MerchantRewardSchema);

//Schema to validate array containing all Reward typesa4/
var RewardBatchSchema = new mongoose.Schema({rewards: [RewardSchema]});
RewardBatchSchema.path('rewards').discriminator('Category', CategoryRewardSchema);
RewardBatchSchema.path('rewards').discriminator('Merchant', MerchantRewardSchema);

module.exports = {
  Reward,
  CategoryReward,
  MerchantReward,
  RewardBatchSchema
}