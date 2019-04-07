const expect = require('expect');
const {Admin} = require('../../server/db/models/admin');

var admin; 
beforeEach(() => {
    admin = new Admin({
      username: "John",
      username: "admin",
      password: "password"
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