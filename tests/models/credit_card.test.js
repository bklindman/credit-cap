const expect = require('expect');
const {CreditCard} = require('../../server/db/models/credit_card');

var testCard;
resetCard = () =>{
  testCard = new CreditCard({
    institution: 'Test Bank',
    name: 'Rewards Card',
    fee: {
      amount: 95
    },
    point_system: {
      base_rate: .01,
      bonus: 80,
    }
  });
};
beforeEach(resetCard);

describe('Credit Card', () => {

  describe('Schema Validation', () => {

    it('should be invalid if institution is empty', (done) => {
      testCard["institution"] = undefined;
      testCard.validate(function(err) {
        expect(err.errors['institution'].message).toBeDefined();
        done();
      }); 
    });
  
    it('should be invalid if name is empty', (done) => {
      testCard["name"] = undefined;
      testCard.validate(function(err) {
        expect(err.errors['name'].message).toBeDefined();
        done();
      }); 
    });
  
    it('should be invalid if fee is negative', (done) => {
      testCard["fee"]["amount"] = -1;
      testCard.validate(function(err) {
        expect(err.errors['fee.amount'].message).toBeDefined();
        done();
      }); 
    });
  
    it('should be valid if all above properties are valid', (done) => {
      testCard.validate(function(err) {
        if(err){
          done(err)
        } else {
          expect(err).toBeNull();
          done();
        }
      });
    });
  });

  describe('Point System Property Validation', () => {

    it('should be invalid if bonus is negative', (done) => {
      testCard.point_system.bonus = -1;
      testCard.validate(function(err) {
        expect(err.errors['point_system.bonus'].message).toBeDefined();
        done();
      }); 
    });

    it('should be invalid if unit property does not have enum value', (done) =>{
      testCard.point_system.unit = 'NA';
      testCard.validate((err) => {
        expect(err.errors['point_system.unit'].message).toBeDefined();
        done();
      });
    });

    it('should be invalid if an item in array is not a Reward', (done) => {
      testCard.point_system.rewards = [5];
      testCard.validate(function(err){
        expect(err.errors['point_system.rewards'].message).toBeDefined();
        done();
      });
    });

    it('should be valid if all items in array are Rewards', (done) => {
      var reward1 = {
        kind: 'Merchant',
        name: 'Test Merchant',
        rate: .01
      };
      testCard.point_system.rewards = [reward1];
      testCard.validate(function(err){
        expect(err).toBeNull();
        done();
      });
    });
  });
});
