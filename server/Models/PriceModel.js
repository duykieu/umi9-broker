const mongoose = require("mongoose");

const PriceModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    orderNumber: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("PriceModel", PriceModelSchema, "price_models");
