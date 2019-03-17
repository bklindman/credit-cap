const expect = require('expect');
const {Reward, CategoryReward, MerchantReward} = require('../../server/db/models/reward');

var testReward;

describe('Rewards Validation', () => {
  beforeEach(()=>{
    testReward = new Reward({
      name: 'test',
      reward: .01
    });
  });

  it('should fail if it is missing a name', (done) => {
    testReward.name = undefined; 
    testReward.validate((err) => {
      expect(err.errors['name']).toBeDefined();
      done();
    });
  });

  it('should fail if it is missing a reward rate', (done) => {
    testReward.reward = undefined;
    testReward.validate((err) => {
      expect(err.errors['reward']).toBeDefined();
      done();
    });
  });

  it('should pass if properties above are valid', (done) => {
    testReward.validate((err)=> {
      expect(err).toBeNull();
      done();
    });
  });

  describe('Category Reward', () => {
    beforeEach(()=>{
      testReward = new CategoryReward({
        name: 'test',
        reward: .01
      });
    });

    it('should fail if it is missing a category_id', (done) => {
      testReward.validate((err) => {
        expect(err.errors['category_id']).toBeDefined();
        done();
      });
    });

    it('should pass if it has a category_id', (done) => {
      testReward.category_id = "12415";
      testReward.validate((err) => {
        expect(err).toBeNull();
        done();
      });
    });

  });

});