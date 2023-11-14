const ContactUser = require("../model/ContactUser");

const getAllUserRequest = async (req, res) => {
    const users = await ContactUser.find();
    if (!users) return res.status(204).json({ 'message': 'Users not found.' });
    res.status(200).json(users);
}

// const createNewEmployee = async (req, res) => {
//     if (!req?.body?.firstname || !req?.body?.lastname) {
//         return res.status(400).json({ 'message': 'First and last names are required' });
//     }

//     try {
//         const result = await Employee.create({
//             firstname: req.body.firstname,
//             lastname: req.body.lastname
//         });

//         res.status(201).json(result);
//     } catch (err) {
//         console.error(err);
//     }
// }

const updateUserStatus = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const user = await ContactUser.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${req.body.id}.` });
    }
    if (req.body?.firstname) user.firstname = req.body.firstname;
    if (req.body?.lastname) user.lastname = req.body.lastname;
    const result = await user.save();
    res.status(200).json({ success: true, result });
}

const deleteRequest = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Employee ID required.' });

    const user = await ContactUser.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `user not matches ID ${req.body.id}.` });
    }
    const result = await user.deleteOne(); //{ _id: req.body.id }
    res.status(200).json({ success: true, result });
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Employee ID required.' });

    const users = await ContactUser.findOne({ _id: req.params.id });
    if (!users) {
        return res.status(204).json({ "message": `No users matches ID ${req.params.id}.` });
    }
    res.status(200).json({ success: true, employee });
}

module.exports = {
    getAllUserRequest,
    // createNewEmployee,
    updateUserStatus,
    deleteRequest,
    getUser
}