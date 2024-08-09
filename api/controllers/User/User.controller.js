const User = require('../../models/User.models');
const md5 = require('md5');
const { checkValidationResults } = require('../../../validate/validateRegister');

module.exports.User = async (req, res) => {
    const find = {
       deleted : false
    }
    const user = await User.find(find);
    res.json(user);
}

module.exports.addUser = async (req, res) => {
    // Kiểm tra lỗi validate
    checkValidationResults(req, res, async () => {
        // Mã hóa mật khẩu
        const hashedPassword = md5(req.body.password);

        // Kiểm tra xem username đã tồn tại chưa
        const existUserName = await User.findOne({ username: req.body.username });
        const existEmail = await User.findOne({
            email : req.body.email,
            deleted : false 
        })
        if (existEmail && existUserName) {
            return res.json({
                code: 400,
                message: 'Username or email already exists'
                });
        } else {
            const { username, email, birthday, fullName, role_id, status } = req.body;
            const newUser = new User({
                username,
                password: hashedPassword,
                email,
                birthday,
                fullName,
                role_id,
                status
            });

            // Lưu user vào cơ sở dữ liệu
            await newUser.save();

            // Tạo token cho người dùng
            const token = newUser.token;

            res.cookie('token', token);

            res.json({
                message: 'Register successfully!',
                user: newUser,
                token: token
            });
        }
    });
};

module.exports.editUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, birthday, fullName, role_id, status } = req.body;
    const find = {
        _id: id
    }
    const user = await User.findOne(find);
    if (!user) {
        res.json({
            code: 400,
            message: 'User không tồn tại'
        });
        return;
    }
    if (username) {
        user.username = username;
    }
    if (email) {
        user.email = email;
    }
    if (birthday) {
        user.birthday = birthday;
    }
    if (fullName) {
        user.fullName = fullName;
    }
    if (role_id) {
        user.role_id = role_id;
    }
    if (status) {
        user.status = status;
    }
    await user.save();
    res.json({
        code: 200,
        message: 'Sửa user thành công'
    });
}

module.exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const find = {
        _id: id
    }
    const user = await User.findOne(find);
    if (!user) {
        res.json({
            code: 400,
            message: 'User không tồn tại'
        });
        return;
    }
    user.deleted = true;
    await user.save();
    res.json({
        code: 200,
        message: 'Xóa user thành công'
    });
}

module.exports.deleteManyUser = async (req, res) => {
    const { ids } = req.body;
    const find = {
        _id: {
            $in: ids
        }
    }
    const user = await User.updateMany(find, { deleted: true });
    res.json({
        code: 200,
        message: 'Xóa user thành công'
    });
}