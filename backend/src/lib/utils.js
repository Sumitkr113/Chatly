const jwt = require("jsonwebtoken");
const getCookieOptions = require("./cookieOptions");

const generateToken = (userId, res) => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("jwt", token, {
        ...getCookieOptions(),
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
};

module.exports = generateToken;