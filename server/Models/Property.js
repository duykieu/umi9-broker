const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    state: {
        type: mongoose.Types.ObjectId,
        ref: "State",
        required: true,
    },
    city: {
        type: mongoose.Types.ObjectId,
        ref: "City",
        required: true,
    },
    project: {
        type: mongoose.Types.ObjectId,
        ref: "Project",
    },
    street: {
        type: mongoose.Types.ObjectId,
        ref: "Street",
        required: true,
    },
    ward: {
        type: mongoose.Types.ObjectId,
        ref: "Ward",
        required: true,
    },
    width: Number,
    long: Number,
    behindWidth: Number,
    landSize: Number,
    gfa: Number,
    price: Number,
    priceModel: {
        type: String,
        required: true,
    },
    priceOnSize: Number,
    numOfFloors: Number,
    numOfBasements: Number,
    numOfRootTops: Number,
    numOfBeds: Number,
    numOfWcs: Number,
    direction: String,
    paperModel: String,
    description: String,
    tags: [String],
    images: [String],

    //User
    createdUser: {
        type: String,
        ref: "User",
    },
    updatedUser: {
        type: String,
        ref: "User",
    },
    user: {
        type: String,
        ref: "User",
    },
    createdAt: Date,
    updatedAt: Date,
    firstContact: {
        //The host or partner or staff
        type: String,
        ref: "User",
    },
    secondContact: {
        //The host or partner or staff
        type: String,
        ref: "User",
    },
    history: String,
    commission: String,
    status: {
        type: String,
        required: true,
        enum: ["ok", "hide", "deleted", "out"],
        default: "ok",
    },
});

module.exports = mongoose.model("Property", PropertySchema);
