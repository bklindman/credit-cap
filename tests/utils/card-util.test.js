const expect = require('expect');
const {CreditCard} = require('../../server/db/models/credit_card');
const { getAllCards, calculateRewards, createRewardsMap } = require('../../server/utils/card-util');
const { DiningPurchases, MerchantPurchases, MixedPurchases } = require('../mock/mock-purchases');

var { Cards } = require('../mock/mock-cards');


before(function(done){
  this.timeout(0);
  console.log('Clearing Previous Data in Test DB');
  CreditCard.deleteMany({}).then(()=> {
    console.log('Storing Sample Cards in Test DB')
    for(let card of Cards) {
      let credit = new CreditCard(card);
      credit.save((err) => {
        if(err) console.log(err);
      });
    }
    done();
  });
});

beforeEach(() => {
  Cards = require('../mock/mock-cards').Cards;
});

describe('Credit Card Util Functions', () => {

  describe('getAllCards function', () => {
    it(`should get ${Cards.length} credit cards`, (done) => {
      getAllCards().then((cards) => {
        expect(cards.length).toBe(Cards.length);
        done();
      }).catch((e) => {
        done(e);
      });
    });
  });

  describe('createRewardsMap function', () => {
    it('should create a key-value object mapping a category/merchant to it\'s base rate', () => {
      let card = Cards.find(card => card.name == 'Test Preferred');
      createRewardsMap(card);
      expect(card.name).toEqual('Test Preferred');
      expect(card.rewardsMap).toBeDefined();
      expect(card.rewardsMap.get("22012002")).toBe(2);
    });
  });

  describe('calculateRewards function', () => {
    before(() => {
      for(let card of Cards) {
        createRewardsMap(card);
      }
    });

    it('should calculate category rewards', () => {
      let baseCard = Cards.find(card => card.name == 'Base Card');
      let categoryRewardsCard = Cards.find(card => card.name == 'TestOne Rewards');
      calculateRewards(baseCard, DiningPurchases);
      calculateRewards(categoryRewardsCard, DiningPurchases)
      expect(baseCard.total).toBeCloseTo(90);
      expect(categoryRewardsCard.total).toBeCloseTo(270);
    });

    it('should calculate merchant rewards', () => {
      let baseCard = Cards.find(card => card.name == 'Base Card');
      let merchantRewardsCard = Cards.find(card => card.name == 'Explorer');
      calculateRewards(baseCard, MerchantPurchases);
      calculateRewards(merchantRewardsCard, MerchantPurchases)
      expect(baseCard.total).toBeCloseTo(120);
      expect(merchantRewardsCard.total).toBeCloseTo(240);
    });

    it('should calculate rewards from mixed categories', () => {
      let baseCard = Cards.find(card=> card.name == 'Base Card');
      let travelDiningCard = Cards.find(card => card.name == 'Test Preferred');
      calculateRewards(baseCard, MixedPurchases);
      calculateRewards(travelDiningCard, MixedPurchases);
      expect(baseCard.total).toBeCloseTo(210);
      expect(travelDiningCard.total).toBeCloseTo(420);
    });
  });
});