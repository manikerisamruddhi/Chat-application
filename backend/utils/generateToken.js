import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const payload = { userId };
    const token = jwt.sign({ userId }, "samruddhimanikeri", {
        expiresIn: '15d'
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict"
    });
};

export default generateTokenAndSetCookie;