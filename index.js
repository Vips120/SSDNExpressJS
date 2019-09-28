const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('config');
const port = process.env.PORT || 4000;
require('./controllers/connection')(mongoose);
require('./controllers/routes')(app)
app.use(express.json());
if(!config.get('SSDPRIVATEKEY')){
    console.log('Server get crashed');
    process.exit(1);
}
if(config.get('host.mail') === 'Development mode'){
    app.use(morgan('tiny'));
};
if(process.env.NODE_ENV === 'production'){
    console.log(`password: ${config.get('password')}`);
};
app.use('/uploads', express.static('uploads'));
app.listen(port,() => {console.log(`server working on port number ${port}`)});
