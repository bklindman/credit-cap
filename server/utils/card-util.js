const { CreditCard } = require('../db/models/credit_card');

// Get all credit cards from DB
function getAllCards(){
  return CreditCard.find().then((cards) => {
    return cards;
  });
}

// Run the purchases through each credit card to calculate potential rewards for each
function calculateRewards(card, purchases){
  card.total = 0;
  for(let purchase of purchases){
    let category_id = purchase.category_id;
    let mult = card.point_system.base_rate;
    for (let req of [category_id,category_id.substring(0,5), purchase.name]){
      if(card.rewardsMap.has(req)) {
        mult = card.rewardsMap.get(req);
        break;
      }
    }
    card.total += (purchase.amount * mult);
  }
}

// Flatten and simplify the rewards object from Mongoose Model into a new Map
function createRewardsMap(card){
  card.rewardsMap = new Map();
  for(let reward of card.point_system.rewards){
    if(reward.category_ids){
      for(let category_id of reward.category_ids){
        card.rewardsMap.set(category_id, reward.rate);
      }
    } else {
        card.rewardsMap.set(reward.name, reward.rate);
    }
  }
}

module.exports = {
  getAllCards, 
  calculateRewards, 
  createRewardsMap 
}