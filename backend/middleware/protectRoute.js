import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }

        const decode = jwt.verify(token,"samruddhimanikeri");

        if (!decode) {
            return res.status(401).json({ error: "Unauthorized - Invalid token" });
        }

        const user = await User.findById(decode.userId).select("-password");

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;
        console.log("Current logged user : " + req.user);
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware : " + error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default protectRoute;