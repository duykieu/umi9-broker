const mongoose = require("mongoose");

const WardSchema = new mongoose.Schema({
    name: String,
    slug: String,
    prefix: String,
    city: {
        type: mongoose.Types.ObjectId,
        ref: "City",
    },
});

module.exports = mongoose.model("Ward", WardSchema);
