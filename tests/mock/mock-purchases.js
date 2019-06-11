const MerchantPurchases = [
  {
    category_id: "22001000",
    name: "Test Airlines",
    amount: 30
  },
  {
    category_id: "22001000",
    name: "Test Airlines",
    amount: 40
  },
  {
    category_id: "22001000",
    name: "Test Airlines",
    amount: 50
  }
]

const DiningPurchases = [
  {
    category_id: "13005009",
    name: "Restaurant",
    amount: 20
  },
  
  {
    category_id: "13005016",
    name: "Restaurant",
    amount: 30
  },
  {
    category_id: "13005016",
    name: "Restaurant",
    amount: 40
  }
]

const MixedPurchases = MerchantPurchases.concat(DiningPurchases);
console.log(MixedPurchases);

module.exports = {
  MerchantPurchases,
  DiningPurchases,
  MixedPurchases
}