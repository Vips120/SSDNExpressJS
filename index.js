const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('config');
const port = process.env.PORT || 4000;
const user = require('./routes/user.routes');
const middleware = require('./middleware/user');
const Genre = require('./routes/genre.routes');
const movies = require('./routes/movie.routes');
const userRegistration = require('./routes/userregistration.routets');
app.use(express.json());
if(config.get('host.mail') === 'Development mode'){
    app.use(morgan('tiny'));
};
if(process.env.NODE_ENV === 'production'){
    console.log(`password: ${config.get('password')}`);
}
// app.use(express.urlencoded({extended:true}))
app.use(middleware);
mongoose
.connect('mongodb://localhost/SSDN', { useNewUrlParser: true })
.then(() => console.log('connected to the database'))
.catch(err => console.log('something went wrong', err.message));



// console.log(process);
// console.log(`Production mode: ${process.env.NODE_ENV}`);
// console.log(`development mode : ${app.set('env')}`);
// console.log('mode:', config.get('host.mail'));
app.use('/api/user',user);
app.use('/api/movie', Genre);
app.use('/api/movie', movies);
app.use('/api/users', userRegistration);
app.listen(port,() => {console.log(`server working on port number ${port}`)});
