const { body, validationResult } = require('express-validator');

// Hàm để thực hiện validate
const validateRegister = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'), 
    body('email').isEmail().withMessage('Email is not valid'),
    body('birthday').isDate().withMessage('Birthday is not a valid date'),
];

// Hàm để kiểm tra lỗi
const checkValidationResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            code: 400,
            message: errors.array(),
            });
    }
    next();
};

module.exports = { validateRegister, checkValidationResults };
