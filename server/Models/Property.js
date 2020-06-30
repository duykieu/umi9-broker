const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    addressSlug: {
        type: String,
        required: true,
    },
    width: Number,
    long: Number,
    behindWidth: Number,
    landSize: Number,
    gfa: Number,
    type: {
        type: String,
        required: true,
    },
    price: Number,
    priceModel: String,
    priceOnSize: Number,
    numOfFloors: Number,
    numOfBasements: Number,
    numOfRootTops: Number,
    numOfRooms: Number,
    numOfBeds: Number,
    description: String,
    tags: String,
    images: [String],

    //User
    createdUser: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    updatedUser: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    createdAt: Date,
    updatedAt: Date,
    infoFrom: {
        //The host or partner or staff
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    history: String,
    status: {
        type: String,
        required: true,
        enum: ["ok", "hide", "deleted"],
        default: "ok",
    },
});

module.exports = mongoose.model("Property", PropertySchema);
