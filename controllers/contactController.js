const ContactUser = require("../model/ContactUser");

const handleContactRequest = async (req, res) => {
    const { username, fullName, email, phoneNo, message } = req.body;
    const userContactDetails = new ContactUser({
        fullName: fullName,
        username: username,
        email: email,
        phoneNo: phoneNo,
        message: message
    });
    const result = await userContactDetails.save();
    res.status(202).json({ result });
}

module.exports = { handleContactRequest }