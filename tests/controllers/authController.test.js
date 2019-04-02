const expect = require('expect');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const {app} = require('../../server/index');
const {Admin} = require('../../server/db/models/admin');
const {User} = require('../../server/db/models/user');




const { DBAdmins, DBUsers, newUser, newAdmin, populateUsers}= require('../mock/mock-users');

describe('Authentication Controller /auth', () => {
  before(function(done){
    this.timeout(5000);
    populateUsers(done);
  });

  describe('POST /users', function(){
    it('should add new user to DB', function(done){
      let user = newUser;
      request(app)
      .post('/auth/users')
      .send(user)
      .expect(200)
      .expect((res) => {
        expect(res.body.token).toBeDefined();
      }).end((err, response) => {
        if(err) done(err);
        let token = jwt.decode(response.body.token);
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
      .post('/auth/users')
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

  describe('POST /user/login', () => {

    it('should return token with valid user credentials', (done) => {
      let user = DBUsers[1];
      request(app)
      .post('/auth/user/login')
      .send(user)
      .expect(200)
      .expect((res) => {
        expect(res.body.token).toBeDefined();
      }).end((err, response) => {
        if(err) return done(err);
        let token = jwt.decode(response.body.token);
        expect(token.username).toBe(user.username);
        done();
      });
    });

    it('should return authentication failure with invalid credentials', (done) => {
      let incorrectCreds = Object.assign({}, DBUsers[0]);
      incorrectCreds.password = "wrongpassword";
      request(app)
      .post('/auth/user/login')
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
      .post('/auth/user/login')
      .send(admin)
      .expect(400, done);
    });
  });

  describe('POST /admin/login', () => {
    it('should not allow users to log in as admins', (done) => {
      let user = DBUsers[0];
      request(app)
      .post('/auth/admin/login')
      .send(user)
      .expect(400, done);
    });
  });
});