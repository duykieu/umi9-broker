const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  width: Number,
  long: Number,
  behindWidth: Number,
  landSize: Number,
  gfa: Number,
  type: {
    String,
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
  images: [
    {
      original: String,
      thumbnail: String,
      crop: String,
    },
  ],
  firstContact: {
    name: String,
    phone: String,
  },
  secondContact: {
    name: String,
    phone: String,
  },
  thirdContact: {
    name: String,
    phone: String,
  },
  //User
  updatedUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  createdDate: Date,
  updatedDate: Date,
  fromPartner: Boolean,
  history: String,
});

module.exports = mongoose.model("Property", PropertySchema);
