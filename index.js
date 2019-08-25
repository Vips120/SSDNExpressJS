const express = require('express');
const app = express();
app.use(express.json());
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

app.get('/api/user', (req,res) => {
    res.send(users);
});

app.get('/api/user/:id', (req,res) => {
    // let id = req.params.id;
  let user = users.find(item => item.id === parseInt(req.params.id));
  if(!user) {return res.status(403).send({message:'invalid id'})}
    res.send(user);
});

app.post('/api/newuser', (req,res) => {
    let newUser = {
        id:users.length + 1,
        name:req.body.name
    };
    users.push(newUser);
    res.send(users);
});

app.put('/api/updateuser/:id' ,(req,res) => {
    let user = users.find(item => item.id === parseInt(req.params.id));
  if(!user) {return res.status(403).send({message:'invalid id'})}
  user.name = req.body.name;
  res.send(user);
});

app.delete('/api/removeuser/:id', (req,res) => {
    let user = users.find(item => item.id === parseInt(req.params.id));
    if(!user) {return res.status(403).send({message:'invalid id'})}
    let index = users.indexOf(user);
    let data = users.splice(index,1);
    res.send({message:'remove the data! come back again :('})

})


app.listen(4000,() => {console.log('server working on port number 4000')});
