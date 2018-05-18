const mongoose = require("mongoose");
const { Schema } = mongoose;

const saleSchema = new Schema({
    type: { required: true, type: String, enum:["yardsale", "garagesale", "movingsale", "estatesale"] },
    address: { required: true, type: String },
    start_time: { required: true, type: String },
    end_time: { required: true, type: String },
    date:{required:true, type: String},
    description: { required: false, type: String },
    image_url: { required: false, type: String },
    lat:{required:false, type:Number},
    lng:{required:false, type:Number},
    title:{required:true, type: String},
    sellerId: { required: true, type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    }
});

const SaleModel = mongoose.model("sale", saleSchema);
module.exports = SaleModel;