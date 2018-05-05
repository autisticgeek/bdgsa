const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: { required: true, type: String },
    password: {required:true, type:String},
    emailVerified: {default:false, type:Boolean},
    accountStatus:{default:"unverified", type:String},
    token: {type:String}
})

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
