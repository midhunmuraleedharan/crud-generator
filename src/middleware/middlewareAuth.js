import { userSchema } from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export async function requireSignIn(req, res, next) {
    if (req.headers.authorization != undefined) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.decode(token, process.env.JWT_SECRET);
        if (user != null) {
            userSchema.findById({ _id: user._id }).then((result) => {
                if (result._id == user._id) {
                    next();
                } else {
                    return res.status(400).json({
                        status: false,
                        message: "Authentication failed",
                    });
                }
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Authentication failed",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "Authentication failed",
        });
    }
}
