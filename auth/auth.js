let express = require('express');
let router = express.Router();
let bcrypt =require('bcrypt');
let U = require('../mongodb/userRegistration');
let Joi = require('@hapi/joi');
let jwt = require('jsonwebtoken');
let config = require('config');
let authmid = require('../middleware/auth');
router.post('/', authmid, async (req,res) => {
  let {error} = ValidationError(req.body);
  if(error) {return res.status(402).send(error.details[0].message)}
  let user = await U.User.findOne({"UserLogin.email": req.body.UserLogin.email});
  if(!user){return res.status(402).send('invalid email id!')}
  let password = await bcrypt.compare(req.body.UserLogin.password, user.UserLogin.password);
  if(!password) {return res.status(402).send('invalid password! please try again')}
  let token = user.UserIdentity();
  res.send(token);
});

function ValidationError(message) {
    let Schema = Joi.object().keys({
        UserLogin:{
            email: Joi.string().required(),
            password: Joi.string().required()
        }
    });
    return Joi.validate(message, Schema);
}

module.exports = router;