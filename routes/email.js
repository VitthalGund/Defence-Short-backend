const express = require('express');
const router = express.Router();
const handleEmailSend = require("../controllers/contactController")

//TODO
// router.post('/', handleEmailSend.handleContactRequest);
router.get('/', async (req, res) => {
    handleEmailSend.handleContactRequest(req, res);
});

module.exports = router;        