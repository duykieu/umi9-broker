const mongoose = require("mongoose");
const validator = require("validator");

const ImageSchema = new mongoose.Schema({
    imageId: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    originalUrl: {
        type: String,
        required: true,
        validate: {
            validator: value => validator.isURL(value),
        },
    },
    smallUrl: {
        type: String,
        validate: {
            validator: value => validator.isURL(value),
        },
    },
    mediumUrl: {
        type: String,
        validate: {
            validator: value => validator.isURL(value),
        },
    },
    largeUrl: {
        type: String,
        validate: {
            validator: value => validator.isURL(value),
        },
    },
});

module.exports = mongoose.model("Image", ImageSchema);
