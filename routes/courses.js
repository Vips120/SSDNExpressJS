let mongoose = require('mongoose');
mongoose
.connect('mongodb://localhost/SSDN', { useNewUrlParser: true })
.then(() => console.log('connected to the database'))
.catch(err => console.log('something went wrong', err.message));

let courseSchema = new mongoose.Schema({
    tags:[String],
    date:{type:Date,default:Date.now()},
    name:{type:String},
    author:{type:String},
    isPublished:{type:Boolean}
});

let Course = mongoose.model('courses', courseSchema);

async function Courses(){
    let data = await Course.find();
    console.log(data); 
}

Courses();