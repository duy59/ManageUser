const UserRouter = require('./User/User');
const LoginRouter = require('./User/login.router');

module.exports = (app) => {
    
    
    app.use('/api/user', UserRouter);

    app.use('/api/user', LoginRouter);

    
};

