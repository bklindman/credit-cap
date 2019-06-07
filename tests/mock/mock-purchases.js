const MerchantPurchases = [
  {
    category_id: "22001",
    name: "Test Airlines",
    amount: 30
  },
  {
    category_id: "22001",
    name: "Test Airlines",
    amount: 40
  },
  {
    category_id: "22001",
    name: "Test Airlines",
    amount: 50
  }
]

const DiningPurchases = [
  {
    category_id: "17001009",
    name: "Restaurant",
    amount: 20
  },
  
  {
    category_id: "17001016",
    name: "Restaurant",
    amount: 30
  },
  {
    category_id: "17001016",
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