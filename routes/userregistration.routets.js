let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let u = require('../mongodb/userRegistration');
let auth = require('../middleware/auth');
let admin = require('../middleware/admin');

router.get('/me',auth, async(req,res) => {
    let user = await u.User
    .findById(req.userRegistration._id)
     .select("-UserLogin.password")
    ;
    res.send(user);
} );


router.post('/newuser', async(req,res) => {
    let {error} = u.ValidationError(req.body);
    if(error) {return res.status(402).send(error.details[0].message)}
    let user = await u.User.findOne({"UserLogin.email": req.body.UserLogin.email})
   if(user) {return res.status(402).send('email id already exsists')}
   let data = new u.User({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    userId: req.body.userId,
    UserLogin:req.body.UserLogin
});
let salt = await bcrypt.genSalt(10);
data.UserLogin.password = await bcrypt.hash(data.UserLogin.password, salt);

let items = await data.save();
//Information Expert Principle
let token = items.UserIdentity();
res.header('x-auth-token', token).send({message:'thanks for the registration', data:items})
});

router.delete('/removeuser/:id', [auth,admin],async (req,res) => {
let data = await u.User.findByIdAndRemove(req.params.id);
if(!data) {return res.status(402).send('invalid token')}
res.send({message: 'remve the data'});
})
module.exports = router;