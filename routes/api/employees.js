const express = require('express');
const router = express.Router();
const contactUserController = require('../../controllers/contactUserController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(contactUserController.getAllUserRequest)
    // .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), contactUserController.updateUserStatus)
    .delete(verifyRoles(ROLES_LIST.Admin), contactUserController.deleteRequest);

router.route('/:id')
    .get(contactUserController.getUser);

module.exports = router;