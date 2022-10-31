import { userSchema } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function signUp(req, res) {
    try {
        userSchema.findOne({ email: req.body.email }).exec((err, user) => {
            if (user) {
                return res.status(400).json({
                    status: "false",
                    message: "User already exist",
                    data: {}
                });
            } else {
                const { firstName, lastName, email, password } = req.body;

                const hash_password = bcrypt.hashSync(password, 10);

                const _user = new userSchema({
                    firstName,
                    lastName,
                    email,
                    hash_password,
                    username: Math.random().toString(),
                });
                _user.save((err, data) => {
                    if (data) {
                        return res.status(200).json({
                            status: "true",
                            message: "Account created successfully",
                            data: { data }
                        });
                    } else if (err) {
                        return res.status(400).json({
                            status: "false",
                            message: "Something went wrong, Account creation failed",
                            data: { err }
                        });
                    }
                });
            }
        });
    } catch (err) {
        return res.status(500).json({
            status: "false",
            message: "internal error please contact support",
            data: { err }
        })
    }
}

export async function signIn(req, res) {
    try {
        userSchema.findOne({ email: req.body.email }).exec(async (error, user) => {
            if (error) return res.status(400).json({
                status: "false",
                data: { err }
            });
            if (user) {
                const isPassword = await user.authenticate(req.body.password);
                if (isPassword) {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
                        expiresIn: "1d",
                    });
                    res.status(200).json({
                        status: "true",
                        message: "successfully logged in",
                        data: { token: token },
                    });
                } else {
                    res.status(400).json({
                        status: "false",
                        message: "invalid user",
                        data: {}
                    });
                }
            } else {
                res.status(400).json({
                    status: "false",
                    message: "Something went wrong",
                    data: {}
                });
            }
        });
    } catch (err) {
        return res.status(500).json({
            status: "false",
            message: "internal error please contact support",
            data: { err }
        })
    }
}


