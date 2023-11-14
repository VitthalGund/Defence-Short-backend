const User = require('../model/User');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken to logout the user

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // to check where the refreshToken in database?
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // if refreshTokem found, Delete refreshToken in database
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    // console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogout }