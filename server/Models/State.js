const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema({
    name: String,
    code: String,
    slug: String,
});

module.exports = mongoose.model("State", StateSchema);
