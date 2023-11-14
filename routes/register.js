const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const { validationResult, body } = require('express-validator');

router.post('/', [
    body('username').isLength({ "min": 2 }),
    body("email").isEmail(),
    body('password').isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })], async (req, res) => {
        // to validate the user details to create new user
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        await registerController.handleNewUser(req, res)
    });

module.exports = router;