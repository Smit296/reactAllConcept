const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const BankSchema = new mongoose.Schema(
  {
    bankName: {
      type: String,
    },
    registrationNumber: {
      type: String,
    },
    emailid: {
      type: String,
    },
    password: {
      type: String,
    },
    number: {
      type: Number,
    },
  },

  {
    collection: "bank",
  }
);

const Bank = mongoose.model("Bank", BankSchema);
module.exports = Bank;
