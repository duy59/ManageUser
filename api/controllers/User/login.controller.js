const User = require('../../models/User.models');
const forgotPassword = require('../../models/ForgotPassword.model');
const md5 = require('md5');
const generate = require("../../../helper/generate")
const sendMail = require("../../../helper/sendMail")

module.exports.login = async (req, res) => {
    const { email , password} = req.body;
    const find = {
        email
    }
    const user= await User.findOne(find);
    if (!user) {
        res.json({
            code : 400,
            message: 'email không tồn tại' 
        });
            return ;
    } 
    if(md5(password) !== user.password) {
        res.json({
            code : 400,
            message: ('Mật khẩu không chính xác')
        });
            return ;
    }
    const token = user.token;
    res.cookie('token', token);
    res.json({
        code : 200,
        message: 'Đăng nhập thành công',
        token: token
    });
}

module.exports.forgotPassword = async (req, res) => {
    const { email} = req.body;
    const find = {
        email
    }
    const user= await User.findOne(find);
    if (!user) {
        res.json({
            code : 400,
            message: 'email không ton tai'
        });
            return ;
    }
    const otp = generate.generateRandomNumber(8)
    const timeExpire = 5 ;
    const objectForgotPassword = {
        email : email,
        otp : otp,
        expireAt : Date.now() + timeExpire * 60 
    }
    const newForgotPassword = new forgotPassword(objectForgotPassword);
    await newForgotPassword.save();
    
    const subject = 'Mã OTP xác nhận quên mật khẩu';
    const html = `Mã OTP của bạn là : ${otp}`;
    sendMail.sendMail(email, subject, html);
    
    res.json({
        code : 200,
        message: 'Mã OTP đã được gửi vào email của bạn'
    });
}

module.exports.otp = async (req, res) => {
    const { email, otp} = req.body;
    const find = {
        email,
        otp
    }
    const result= await forgotPassword.findOne(find);
    if (!result) {
        res.json({
            code : 400,
            message: 'OTP khong chinh xac'
        });
            return ;
    }
    const user = await User.findOne({email});
    const token = user.token;
    res.cookie('token', token);

    res.json({
        code : 200,
        message: 'Xác nhận thành công',
        token: token
    });
}
module.exports.resetPassword = async (req, res) => {
    const token = req.body.token;
    const password = req.body.password; 

    const user = await  User.findOne({token});
    if(md5(password) === user.password) {
        res.json({
            code : 400,
            message: 'Mật khẩu mới không được trùng với mật khẩu cũ'
        });
            return ;
    }
    await User.updateOne(
        { token },
        { password: md5(password) }
    );
    res.json({
        code : 200,
        message: 'Đổi mật khẩu thành công'
    });


}