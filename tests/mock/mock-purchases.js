const MerchantPurchases = [
  {
    category_id: "22001000",
    category: ['Travel'],
    name: "Test Airlines",
    amount: 30
  },
  {
    category_id: "22001000",
    category: ['Travel'],
    name: "Test Airlines",
    amount: 40
  },
  {
    category_id: "22001000",
    category: ['Travel'],
    name: "Test Airlines",
    amount: 50
  }
]

const DiningPurchases = [
  {
    category_id: "13005009",
    category: ['Food & Dining'],
    name: "Restaurant",
    amount: 20
  },
  
  {
    category_id: "13005016",
    category: ['Food & Dining'],
    name: "Restaurant",
    amount: 30
  },
  {
    category_id: "13005016",
    category: ['Food & Dining'],
    name: "Restaurant",
    amount: 40
  }
]

const MixedPurchases = MerchantPurchases.concat(DiningPurchases);

module.exports = {
  MerchantPurchases,
  DiningPurchases,
  MixedPurchases
}