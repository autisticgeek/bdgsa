const mongoose = require("mongoose");
const { Schema } = mongoose;

const saleSchema = new Schema({
    saleType: { required: true, type: String },
    address: { required: true, type: String },
    startTime: { required: true, type: String },
    endTime: { required: true, type: String },
    description: { required: true, type: String },
    imgUrl: { required: false, type: String },
    type:{type:String},
    sellerId: { required: true, type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
    }
});

const SaleModel = mongoose.model("sale", saleSchema);
module.exports = SaleModel;