let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DS', {useNewUrlParser:true})
      .then(() => console.log('connected to db'))
      .catch(err => console.log('something went wrong', err.message))
      
      let authorSchema = new mongoose.Schema({
          name:{type:String,required:true,min:5, max:250},
          website:{type:String,required:true},
          emailId:{type:String,required:true}
      });

      let courseSchema = new mongoose.Schema({
          name: {type:String},
          authorId:{type:mongoose.Schema.Types.ObjectId, ref:'authors'}
      })

      let Author = mongoose.model('authors', authorSchema);
      let Course = mongoose.model('courses', courseSchema);

      async function Authors(){
let data = new Author({
    name: 'vipul',
    website: 'www.codewithvipul.com',
    emailId: 'vs@gmail.com'
});

let items = await data.save();
console.log(items);
      }

      Authors();

    async function Courses(authorId){
        let data = new Course({
            name: 'Angular',
            authorId: authorId
        });
        
        let items = await data.save();
        console.log(items);
              }

             // Courses('5d73590e19b6961318c7f3c8');

             async function AllCourses(){
                 let data = await Course
                                .find()
                                .populate('authorId','website')
                                .select(['name', 'authorId']);
                                console.log(data);
             };

            //  AllCourses();