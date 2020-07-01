const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
    name: String,
    slug: String,
    state: {
        type: mongoose.Types.ObjectId,
        ref: "State",
    },
});

module.exports = mongoose.model("City", CitySchema);
