const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    model: {
        type: String,
        required: true,
    },
    orderNumber: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Category", CategorySchema);
