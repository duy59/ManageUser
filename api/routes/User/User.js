const express = require('express');
const router = express.Router();

const UserControllers = require('../../controllers/User/User.controller');
const {validateEditUser} = require('../../../validate/validateEdit');
router.get('/', UserControllers.User);

router.post('/add', UserControllers.addUser);

router.patch('/update/:id',validateEditUser, UserControllers.editUser);

router.delete('/delete/:id', UserControllers.deleteUser);

router.delete('/delete', UserControllers.deleteManyUser);

module.exports = router;
