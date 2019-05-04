const expect = require('expect');
const {Admin} = require('../../server/db/models/admin');
const {User} = require('../../server/db/models/user');


var admin; 
var user;
beforeEach(() => {
    admin = new Admin({
      name: "John",
      username: "admin",
      password: "password"
    });
    user = new User({
      name: 'Jane',
      username: 'user1',
      password: 'password'
    });
  }
);

describe('User/Admin', () => {
  describe('Username Validation', () => {
    it('should have a min length of 5', (done) => {
      admin.username = "less";
      admin.validate((err) => {
        expect(err.errors['username']).toBeDefined();
        done();
      });
    });

    it('should be invalid if it starts with a number', (done) => {
      admin.username = "12345";
      admin.validate((err) => {
        expect(err.errors['username']).toBeDefined();
        done();
      });
    });

    it('should be invalid if it contains non-alphanumeric(and underscore) characters', (done) => {
      admin.username = "!(%*Aoalks";
      admin.validate((err) => {
        expect(err.errors['username']).toBeDefined();
        done();
      });
    });

    it('should be valid if it starts with a letter', (done) => {
      admin.username = "a1_2c345";
      admin.validate((err) => {
        expect(err).toBeNull();
        done();
      });
    });
  });

  describe('Password validation', () => {
    it('should be valid if password is alphanumeric with special characters', () => {
      admin.password = "akjsn1245!";
      expect(Admin.validPassword(admin.password)).toBe(true);
    });

    it('should be valid if password length is >= 8', () => {
      admin.password = "12345678";
      expect(Admin.validPassword(admin.password)).toBe(true);
    });

    it('should be invalid if password length is less than 8', () => {
      admin.password = "1234567";
      expect(Admin.validPassword(admin.password)).toBe(false);
    });
  });
});

describe('User', () => {
  describe('Item Schema', () => {
    it('should be invalid without access_token and item_id properties', (done) => {
      let invalid_item = {
        wrong_prop: 'wrong_prop' 
      };
      user.items.push(invalid_item);
      user.items[0].validate((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it(('should be valid with access_token and item_id properties'), (done) => {
      let valid = {
        access_token: 'test_token',
        item_id: 'test_id',
        institution_name: 'Test Bank'
      }
      user.items.push(valid);
      user.items[0].validate((err) => {
        expect(err).toBeNull();
        done();
      });
    });
  });
});