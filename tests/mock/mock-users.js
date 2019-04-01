const {Admin} = require('../../server/db/models/admin');
const {User} = require('../../server/db/models/user');


const DBUsers = [
  {
    username: 'user1',
    password: 'password123'
  },
  {
    username: 'user2',
    password: 'password456'
  }
];

const DBAdmins = [
  {
    username: 'adminOne',
    password: 'password321'
  },
  {
    username: 'adminTwo',
    password: 'password654'
  }
];

const newUser = new User({
  username: 'newuser',
  password: 'newpassword'
});

const newAdmin = new Admin({
  username: 'newadmin',
  password: 'newadminpassword'
});

var populateUsers = function(done){
  console.log('Emptying Database');
  User.deleteMany({}).then(() => {
    console.log('Inserting mock users and admins');
    var results = []
    for(var user of DBUsers){
      results.push(new User(user).save());
    }
    for(var admin of DBAdmins){
      results.push(new Admin(admin).save());
    }
    return Promise.all(results);
  }).then(() => {
    done();
  });
};

module.exports = {
  DBAdmins, DBUsers,
  newUser, newAdmin,
  populateUsers
}