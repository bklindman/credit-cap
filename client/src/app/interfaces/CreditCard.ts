export interface CreditCard {
  name: String;
  institution: String;
  fee: Fee;
  point_system: PointSystem;
}

interface Fee {
  amount: Number;
  is_waived_1st_yr: Boolean;
}

interface PointSystem {
  base_rate: Number;
  bonus: Number;
  unit: String;
  unit_to_dollar_ratio: Number;
  rewards: [Reward];
}

interface Reward {
  name: String;
  rate: Number;
  limit: Number;
}