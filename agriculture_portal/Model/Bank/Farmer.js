const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FarmerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    emailid: {
      type: String,
    },
    number: {
      type: Number,
    },
    date: {
      type: Date,
    },
    addhar: {
      type: Number,
    },
    place: {
      type: String,
    },
    bankName: {
      type: String,
    },
    schemeName: {
      type: String,
    },
  },

  {
    collection: "farmer",
  }
);

const Farmer = mongoose.model("Farmer", FarmerSchema);
module.exports = Farmer;
