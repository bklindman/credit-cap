var express = require('express');
const {User} = require('../db/models/user');
const {Admin} = require('../db/models/admin');
const {auth} = require('../middleware/auth');
const {authAdmin} = require('../middleware/authAdmin');
const moment = require('moment');


var router = express.Router();


router.use( (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.post('/admins/login', (req, res) => {
  loginLogic(req, res, Admin);
});

router.post('/users/login', (req, res) => {
  loginLogic(req, res, User);
});

router.post('/admins', authAdmin, (req, res) => {
  signupLogic(req, res, Admin);
});

router.post('/users', (req, res) => {
  signupLogic(req, res, User);
});

router.get('/test', authAdmin, (req, res) => {
  return res.status(200).send();
});

router.get('/users/logout', auth, (req, res) => {
  let expiry = moment().toDate();
  res.status(200).cookie('x-auth-token', "", {
    expires: expiry
  }).send();
});

function signupLogic(req,res, Type){
  let inst = new Type({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });
  if(Type.validPassword(inst.password)){
    inst.save().then(() => {
      return inst.generateToken();
    }).then((token) => {
      let expiry = moment().add(5, 'm').toDate();
      res.status(200).cookie('x-auth-token', token, {
        secure: false,
        sameSite: 'LAX',
        expires: expiry,
        httpOnly: false
      }).send({auth: true, name: inst.name, expiry});
    }).catch((e) => {
      if(e.name === 'MongoError'){
        return res.status(400).send({message:"A user already exists with that username."});
      }
      res.status(400).send(e);
    });
  } else {
    return res.status(401).send({message: "Password must be a minimum length of 8"});
  }
}

function loginLogic(req, res, Type) {
  let inst = new Type({
    username: req.body.username,
    password: req.body.password
  });
  Type.findByCredentials(inst.username, inst.password, inst.role).then((user) => {
    let expiry = moment().add(5, 'm').toDate();
    var token = user.generateToken();
    res.status(200).cookie('x-auth-token', token, {
      secure: false,
      sameSite: 'LAX',
      expires: expiry,
      httpOnly: false
    }).send({auth: true, name: user.name, expiry});
  }).catch((e)=> {
    if(e === 'Invalid username/password.'){
      return res.status(401).send({message: e});
    }
    res.status(400).send();
  });
}


module.exports = router;