const mongoose = require("mongoose");

const PriceModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("PriceModel", PriceModelSchema);
