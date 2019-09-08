let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let u = require('../mongodb/userRegistration');

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
res.send({message:'thanks for the registration', data:items})

});
module.exports = router;