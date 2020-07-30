const mongoose = require("mongoose");
const Street = require("./Street");

const PropertySchema = new mongoose.Schema({
    categorySlug: {
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
    priceModelCode: {
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
    structure: String,
    description: String,
    tags: [String],
    images: [String],

    //User
    createdUserPhoneNumber: {
        type: String,
        ref: "User",
    },
    updatedUserPhoneNumber: {
        type: String,
        ref: "User",
    },
    createdAt: Date,
    updatedAt: Date,
    firstContactPhoneNumber: {
        //The host or partner or staff
        type: String,
        ref: "User",
    },
    secondContactPhoneNumber: {
        //The host or partner or staff
        type: String,
        ref: "User",
    },
    history: String,
    commission: String,
    status: {
        type: String,
        enum: ["ok", "hide", "deleted", "out"],
        default: "ok",
    },
});

PropertySchema.set("toJSON", { virtuals: true });
PropertySchema.set("toObject", { virtuals: true });

PropertySchema.virtual("category", {
    ref: "Category",
    localField: "categorySlug",
    foreignField: "slug",
    justOne: true,
});

PropertySchema.virtual("fullAddress").get(function () {
    return `${
        (this.address && this.address + " ") || ""
    }${this.street.prefix} ${this.street.name}, ${this.ward.prefix} ${this.ward.name}, ${this.city.name}`;
});

module.exports = mongoose.model("Property", PropertySchema);
