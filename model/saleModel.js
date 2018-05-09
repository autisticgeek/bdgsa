const mongoose = require("mongoose");
const { Schema } = mongoose;

const saleSchema = new Schema({
    address: { required: true, type: String },
    time: { required: true, type: String },
    phoneNumber: { required: false, type: Number },
    emailAddress: { required: false, type: String },
    description: { required: true, type: String },
    imgUrl: { required: false, type: String }
});

const SaleModel = mongoose.model("sale", saleSchema);
module.exports = SaleModel;