let mongoose = require('mongoose');
let Joi = require('@hapi/joi');
let jwt = require('jsonwebtoken');
let config = require('config');

let FileSchema = new mongoose.Schema({
    image:{type:String, required:true}
});


let UserSchema = new mongoose.Schema({
    firstname:{type:String,required:true,min:5,max:250},
    lastname:{type:String,required:true,min:5,max:250},
    userId:{type:String,required:true,min:5,max:250},
    UserLogin:{
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true}
    },
    isAdmin:{type:Boolean}
});
 UserSchema.methods.UserIdentity =  function(){
   let token = jwt.sign({_id: this._id, isAdmin:this.isAdmin}, config.get('SSDPRIVATEKEY'));
   return token;
 }

let User = mongoose.model('users', UserSchema);
let File = mongoose.model('File', FileSchema);

function ValidationError(message){
    let Schema = Joi.object().keys({
        firstname: Joi.string().required().min(5).max(250),
        lastname:Joi.string().min(5).max(250).required(),
        userId:Joi.string().required().min(5).max(250),
          UserLogin: {
              email:Joi.string().required(),
              password: Joi.string().required()
          }        
    });
    return Joi.validate(message,Schema);
}

module.exports = {User,ValidationError,File};