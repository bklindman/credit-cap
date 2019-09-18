const expect = require('expect');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const {app} = require('../../server/index');
const {Admin} = require('../../server/db/models/admin');
const {User} = require('../../server/db/models/user');




const { DBAdmins, DBUsers, newUser, newAdmin, populateUsers}= require('../mock/mock-users');

describe('Authentication Controller /api/auth', () => {
  before(function(done){
    this.timeout(0);
    populateUsers(done);
  });

  describe('POST /api/auth/users', function(){
    it('should add new user to DB', function(done){
      let user = newUser;
      request(app)
      .post('/api/auth/users')
      .send(user)
      .expect(200)
      .expect((res) => {
        expect(res.header["set-cookie"][0]).toMatch(/x-auth-token/);
      }).end((err, response) => {
        if(err) done(err);
        let token = jwt.decode(getTokenFromHeader(response));
        User.findOne({_id: token.id}).then((db_user) => {
          expect(db_user).toBeDefined();
          expect(db_user.username).toBe(user.username.toLowerCase());
          done();
        }).catch((e) => {
          done(e);
        });
      });
    });

    it('should not accept new user with existing username', function(done){
      let user = DBUsers[0];
      request(app)
      .post('/api/auth/users')
      .send(user)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe("A user already exists with that username.");
      }).end((err, result) => {
        if(err){
          return done(err);
        }
        done();
      });
    });
  });

  describe('POST /api/auth/users/login', () => {

    it('should return token with valid user credentials', (done) => {
      let user = DBUsers[1];
      request(app)
      .post('/api/auth/users/login')
      .send(user)
      .expect(200)
      .expect((res) => {
        expect(res.header["set-cookie"][0]).toMatch(/x-auth-token/);
      }).end((err, response) => {
        if(err) return done(err);
        let token = jwt.decode(getTokenFromHeader(response));
        expect(token.username).toBe(user.username);
        done();
      });
    });

    it('should return authentication failure with invalid credentials', (done) => {
      let incorrectCreds = Object.assign({}, DBUsers[0]);
      incorrectCreds.password = "wrongpassword";
      request(app)
      .post('/api/auth/users/login')
      .send(incorrectCreds)
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Invalid username/password.');
      }).end((err, response) => {
        if(err) return done(err);
        done();
      });
    });
    
    it('should not allow admins to log in as users', (done) => {
      let admin = DBAdmins[0];
      request(app)
      .post('/api/auth/users/login')
      .send(admin)
      .expect(400, done);
    });
  });

  describe('POST /api/auth/admins/login', () => {
    it('should not allow users to log in as admins', (done) => {
      let user = DBUsers[0];
      request(app)
      .post('/api/auth/admins/login')
      .send(user)
      .expect(400, done);
    });
  });
});

var getTokenFromHeader = function(response){
  cookieString = response.header["set-cookie"][0];
  return cookieString.substring(
    cookieString.indexOf("=")+1,
    cookieString.indexOf(";")
  );
}