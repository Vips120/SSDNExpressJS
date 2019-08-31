const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();
let users = [{
    id:1,
    name:'john'
},
{
    id:2,
    name:'kim'
},
{
    id:3,
    name:'rahul'
},
{
    id:4,
    name:'emma'
}
];

router.get('/', (req,res) => {
   res.send(users);
});

router.get('/:id', (req,res) => {
   // let id = req.params.id;
 let user = users.find(item => item.id === parseInt(req.params.id));
 if(!user) {return res.status(403).send({message:'invalid id'})}
   res.send(user);
});

router.post('/newuser', (req,res) => {

    let {error} =ValidationError(req.body);
    // console.log(result);
    if(error){
       return res.status(402).send(error.details[0].message); 
    }

   let newUser = {
       id:users.length + 1,
       name:req.body.name
   };
   users.push(newUser);
   res.send(users);
});

router.put('/updateuser/:id' ,(req,res) => {
   let user = users.find(item => item.id === parseInt(req.params.id));
 if(!user) {return res.status(403).send({message:'invalid id'})}
 let userSchema = Joi.object().keys({
    name: Joi.string().min(4).max(50).required()
    });
        let {error} = ValidationError(req.body);
        // console.log(result);
        if(error){
           return res.status(402).send(error.details[0].message); 
        }
 user.name = req.body.name;
 res.send(user);
});

router.delete('/removeuser/:id', (req,res) => {
   let user = users.find(item => item.id === parseInt(req.params.id));
   if(!user) {return res.status(403).send({message:'invalid id'})}
   let index = users.indexOf(user);
   let data = users.splice(index,1);
   res.send({message:'remove the data! come back again :('})

});


function ValidationError(message){
    let userSchema = Joi.object().keys({
        name: Joi.string().min(4).max(50).required()
        });
        return Joi.validate(message, userSchema);
};

module.exports = router;