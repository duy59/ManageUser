const { body, validationResult } = require('express-validator');

// Hàm để thực hiện validate
const validateLogin = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is not valid'), // Kiểm tra định dạng email
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Hàm để kiểm tra lỗi
const checkValidationResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ // Cập nhật mã trạng thái HTTP
            code: 400,
            message: errors.array(),
        });
    }
    next();
};

module.exports = { validateLogin, checkValidationResults };
