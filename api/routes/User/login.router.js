const express = require('express');
const router = express.Router();
const { validateLogin, checkValidationResults } = require('../../../validate/validateLogin');

const loginControllers = require('../../controllers/User/login.controller');

router.post('/login', validateLogin, checkValidationResults, loginControllers.login);

router.post('/forgotpassword', loginControllers.forgotPassword); 

router.post('/otp', loginControllers.otp);

router.post('/resetpassword', loginControllers.resetPassword);

module.exports = router;