import mongoose from "mongoose";
import bcrypt from "bcrypt";

const user = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowerCase: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
    },
    hash_password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user"],
        default: "user",
    },
});


user.methods = {
    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hash_password)
    }
}

export const userSchema = mongoose.model('User', user);
