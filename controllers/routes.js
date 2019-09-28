const user = require('../routes/user.routes');
const Genre = require('../routes/genre.routes');
const movies = require('../routes/movie.routes');
const userRegistration = require('../routes/userregistration.routets');
const auth = require('../auth/auth');
const fileupload = require('../routes/file.routes');
const mailer = require('../routes/nodemailer');
const resetPassword = require('../routes/resetpassword');
const middleware = require('../middleware/user');
module.exports = (app) => {
    app.use('/api/user',user);
    app.use('/api/movie', Genre);
    app.use('/api/movie', movies);
    app.use('/api/users', userRegistration);
    app.use('/api/auth', auth);
    app.use('/api/', fileupload);
    app.use('/api/', mailer);
    app.use('/api/', resetPassword);
    app.use(middleware);
}