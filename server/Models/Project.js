const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    description: String,
    images: [
        {
            original: String,
            small: String,
            medium: String,
            large: String,
        },
    ],
});

module.exports = mongoose.model("Project", ProjectSchema);
