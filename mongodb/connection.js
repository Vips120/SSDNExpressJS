const mongoose = require('mongoose');
mongoose
.connect('mongodb://localhost/SSDN', { useNewUrlParser: true })
.then(() => console.log('connected to the database'))
.catch(err => console.log('something went wrong', err.message))

let userSchema = new mongoose.Schema({
    name:{type:String},
    author:{type:String},
    courses:[String],
    date:{type:Date,default:Date.now},
    isPublished:{type:Boolean}
});

let UserModel = mongoose.model('user', userSchema);

async function NewUser(){
    let data = new UserModel({
        name:'Raj',
        author:'Pter Thiel',
        courses:['Nodejs', 'Mongodb'],
        isPublished:true
    });
    
    let result = await data.save()
    console.log(result);
}

//comparission operators
//$lt, $lte, $gt, $gte, $in,$nin
async  function GetAllUser(){
  let result = await UserModel
                     //.find({'price':{$gt:10, $lte:40}})
                       //.find({'price':{$in:[10,20,30]}})
                       .find()
                     .sort('-name')
                     .select(['name', 'author'])
  console.log(result);
} 

GetAllUser();

//NewUser();