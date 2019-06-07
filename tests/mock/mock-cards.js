
const Cards = [
  {
    "institution": "Test Bank",
    "name": "Base Card",
    "fee": 0,
    "point_system": {
      "base_rate": 1,
      "rewards": [],
      "bonus": 25000,
      "unit": "Points",
      "ratio_type": "X"
    }
  },
  {
    "institution": "Test Express",
    "name": "TestDay",
    "fee": 0,
    "point_system": {
      "base_rate": 1,
      "rewards": [
        {
          "kind": "Category",
          "name": "Shops",
          "category_ids": ["19047000"],
          "rate": 2,
          "limit": 6000
        }
      ],
      "bonus": 25000,
      "unit": "Points",
      "ratio_type": "X"
    }
  },  
  {
    "institution": "Test",
    "name": "Test Preferred",
    "fee": {
      "amount": 95
    },
    "point_system": {
      "base_rate": 1,
      "rewards": [
        {
          "kind": "Category",
          "name": "Travel and Dining",
          "rate": 2,
          "category_ids": [
            "13005",
            "22001000",
            "22012003",
            "22012002",
            "22005000",
            "22008000",
            "18067000",
            "17007000",
            "22015000",
            "22007000",
            "22016000",
            "22003000",
            "22017000",
            "22013000"
          ]
        }
      ],
      "unit": "Cashback",
      "ratio_type": "%",
      "bonus": 15000
    }
  },
  {
    "institution": "Test Airlines",
    "name": "Explorer Plus",
    "fee": {
      "amount": 95,
      "is_waived_1st_yr":true
    },
    "point_system": {
      "base_rate": 1,
      "rewards": [
        {
          "kind":"Category",
          "name": "Restaurants and Hotels",
          "category_ids": [
            "13005",
            "22012003"
          ],
          "rate": 3
        },
        {
          "kind":"Merchant",
          "name": "Test Airlines",
          "rate": 2
        }
      ],
      "bonus": 50000,
      "unit": "Miles",
      "ratio_type": "X"
    }
  },
  {
    "institution": "Test Airlines",
    "name": "Explorer",
    "fee": {
      "amount": 0,
    },
    "point_system": {
      "base_rate": 1,
      "rewards": [
        {
          "kind":"Category",
          "name": "Restaurants and Hotels",
          "category_ids": [
            "13005",
            "22012003"
          ],
          "rate": 2
        },
        {
          "kind":"Merchant",
          "name": "Test Airlines",
          "rate": 2
        }
      ],
      "bonus": 50000,
      "unit": "Miles",
      "ratio_type": "X"
    }
  },
  {
    "institution": "Test One",
    "name": "TestOne Rewards",
    "fee": 0,
    "point_system": {
      "base_rate": 1,
      "rewards": [
        {
          "kind": "Category",
          "name": "Dining and Entertainment",
          "rate": 3,
          "category_ids": [
            "13005",
            "13003000",
            "13004004",
            "13001",
            "17001009",
            "17001003",
            "17001001",
            "17001018",
            "18065000",
            "17001019",
            "17048000",
            "17001012",
            "17001016",
            "17001015",
            "19017000"
          ] 
        },
        {
          "kind": "Category",
          "name": "Grocery Stores",
          "category_ids": ["19047000"],
          "rate": 2 
        }
      ],
      "bonus": 15000,
      "unit": "Cashback",
      "ratio_type": "%"
    }
  }
];

module.exports = {
  Cards
}