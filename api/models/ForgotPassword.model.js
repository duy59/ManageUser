const mongoose = require('mongoose');

const ForgotPasswordSchema = new mongoose.Schema({
    email : String,
    otp : String ,
    expiredAt : Date
},
{
    timestamps: true
});
const ForgotPassword = mongoose.model('ForgotPassword', ForgotPasswordSchema);
module.exports = ForgotPassword;

