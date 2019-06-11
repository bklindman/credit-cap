const expect = require('expect');
const { mapBanksToAccounts, getCategoryProportions } = require('../../server/utils/user-util');
const { Items } = require('../mock/mock-items');
const { MixedPurchases } = require('../mock/mock-purchases');

describe('User Util Functions', () => {
  describe('mapBanksToAccounts Function', () => {
    it('should map user items to new object', () => {
      let user = {};
      item = Items.find(item => item.institution_name == 'Test Bank');
      user.items = [item];

      expect(mapBanksToAccounts(user)[0]).toEqual({
        name: 'Test Bank',
        accounts: ['Checking', 'Savings']
      });
    });
  });

  describe('getCategoryProportions Function', () => {
    it('should group purchase amount totals based on categories', () => {
      proportions = getCategoryProportions(MixedPurchases);
      expect(proportions).toContainEqual(
        {
          name: 'Food & Dining',
          value: 90
        }
      );
      expect(proportions).toContainEqual(
        {
          name: 'Travel',
          value: 120
        }
      );
    });
  });
});