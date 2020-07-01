const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: String,
    lat: String,
    lng: String,
    description: String,
    city: {
        type: mongoose.Types.ObjectId,
        ref: "City",
    },
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
