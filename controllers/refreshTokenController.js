const User = require('../model/User');
const jwt = require('jsonwebtoken');

// if user jwt token expires then using refresh token we can verify the user
const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });
    // if user not found
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt to assign the new jwt token to user 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "email": decoded.email,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '8h' }
            );
            res.json({ roles, accessToken, email: foundUser.email, username: foundUser.username })
        }
    );
}

module.exports = { handleRefreshToken }