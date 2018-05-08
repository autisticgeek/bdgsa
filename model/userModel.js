const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        required: true, type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        required: true, type: String
    },

    accountStatus: {
        default: "new", type: String
    },
    isAdmin: { type: Boolean, default: false }, emailVerified: {
        default: false, type: Boolean
    },
    emailToken: {
        ype: String
    }
}, {timestamps:true})

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
