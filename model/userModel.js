const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    name: { required: true, type: String },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: { required: true, type: String },
    phoneNumber: String,
    emailVerified: { default: false, type: Boolean },
    accountStatus: { default: "unverified", type: String },
    token: { type: String }
}, { timestamps: true });

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next()
    });
});

userSchema.methods.checkPassword = function (passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    })
}

userSchema.methods.withoutPassword = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}
module.exports = mongoose.model("User",userSchema);