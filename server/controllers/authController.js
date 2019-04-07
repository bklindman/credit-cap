var express = require('express');
const {User} = require('../db/models/user');
const {Admin} = require('../db/models/admin');
const {authAdmin} = require('../middleware/authAdmin');


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

function signupLogic(req,res, Type){
  let inst = new Type({
    username: req.body.username,
    password: req.body.password
  });
  if(Type.validPassword(inst.password)){
    inst.save().then(() => {
      return inst.generateToken();
    }).then((token) => {
      res.status(200).send({auth: true, token: token});
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
    var token = user.generateToken();
    res.status(200).send({auth: true, token: token});
  }).catch((e)=> {
    if(e === 'Invalid username/password.'){
      return res.status(401).send({message: e});
    }
    res.status(400).send();
  });
}


module.exports = router;