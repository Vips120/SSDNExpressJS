const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require('config');
const port = process.env.PORT || 4000;
const user = require('./routes/user.routes');
const middleware = require('./middleware/user');
app.use(express.json());
if(config.get('host.mail') === 'Development mode'){
    app.use(morgan('tiny'));
};
if(process.env.NODE_ENV === 'production'){
    console.log(`password: ${config.get('password')}`);
}
// app.use(express.urlencoded({extended:true}))
app.use(middleware);
// console.log(process);
// console.log(`Production mode: ${process.env.NODE_ENV}`);
// console.log(`development mode : ${app.set('env')}`);
// console.log('mode:', config.get('host.mail'));
app.use('/api/user',user);
app.listen(port,() => {console.log(`server working on port number ${port}`)});
